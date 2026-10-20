export const fields = [
 ['sourceMode','Starting image','select','original',[['original','Generate full-body first'],['before','Use an existing full-body image']]],
 ['model','Image model','select','gpt-image-2.5-sunburst',['gpt-image-2.5-sunburst','gpt-image-2.5-flare','gpt-image-2']],
 ['quality','Quality','select','high',['auto','low','medium','high','xhigh','max']],
 ['size','Output size','select','1024x1536',['1024x1536','1024x1024','1536x1024']],
 ['look','Visual style','select','preserve',[['preserve','Match original'],['photo','Photo'],['anime','Anime'],['manga','Manga (B&W)'],['cartoon','Cartoon'],['comicBook','Comic book'],['oilPainting','Oil painting'],['watercolor','Watercolor'],['pencilSketch','Pencil sketch'],['render3D','3D render'],['pixelArt','Pixel art']]],
 ['speedProfile','Performance','select','fidelity',[['turbo','Turbo'],['balanced','Balanced'],['fidelity','Fidelity']]],
 ['detailPriority','Detail priority','select','fidelity',[['balanced','Balanced'],['fidelity','Reference fidelity'],['construction','Construction realism']]],
 ['upperBodyPass','Upper body refinement','boolean',true],['lowerBodyPass','Lower body refinement','boolean',true],['accessoryPass','Accessories & extra refinement','boolean',true],
 ['refinePasses','General detail passes','number',1,0,3],['constructionPass','Construction cleanup','boolean',true],
 ['bodyBuild','Body build','select','fromSource',[['fromSource','Keep from photo'],['masculine','Masculine'],['feminine','Feminine'],['androgynous','Androgynous']]],
 ['sourceGarment','Source garment','select','auto',['auto','top','shorts','pants','skirt','long_skirt','dress','gown','robe','coat_full','full_length']],
 ['targetSilhouette','Target silhouette','select','auto',[['auto','Auto from reference'],['matchOriginal','Match original'],['skirt','Skirt / short dress'],['longDress','Long dress / gown'],['robeCoat','Robe / long coat'],['capeWide','Cape / wide cloak']]],
 ['maskMode','Mask coverage','select','legwear',['conservative','legwear','full']],['autoMask','Automatic mask','boolean',true],['coverWholeBody','Cover whole body outfit','boolean',true],
 ['shoulderBoost','Extend mask at shoulders','boolean',true],['neckBoost','Extend mask at neckline','boolean',true],['feather','Mask feather (pixels)','number',30,0,40],['neckBlend','Neck blend (pixels)','number',48,0,120],
 ['reviewMask','Review and paint mask before outfit swap','boolean',false],['cleanMaskEdges','Clean mask edges','boolean',true],['matchSkinTone','Match skin tone','boolean',true],
 ['handHandling','Hands','select','regenerate',[['regenerate','Redraw with outfit'],['keepOriginal','Keep original hands']]],['handRepair','Hand repair','select','auto',[['off','Off'],['auto','Auto'],['always','Always']]],
 ['retryBadProportions','Retry bad full-body proportions once','boolean',false],['correctFinalAnatomy','Correct final anatomy','boolean',true],['finishInSelectedStyle','Finish in selected style','boolean',true],
 ['finalCheck','Final quality check','select','off',[['off','Off'],['report','Check and report'],['fix','Check and fix once']]],['checkModel','Check model','select','gpt-6-sol',[['gpt-6-sol','Thorough (GPT-6 Sol)'],['gpt-6-luna','Economy (GPT-6 Luna)']]],['checkPassScore','Minimum quality score','number',7,1,10],
 ...[['lockChestLayout','Chest layout'],['lockRibbonRouting','Ribbon routing'],['lockLegStructure','Leg structure'],['lockFootwear','Footwear'],['lockWeapons','Props'],['lockAccessories','Accessories']].map(([k,l])=>[k,'Preserve '+l.toLowerCase(),'boolean',true]),
 ...[['hairstyleDescription','Hair'],['shoesDescription','Shoes'],['accessoriesDescription','Accessories'],['headwearDescription','Headwear'],['poseDescription','Pose'],['expressionDescription','Expression']].map(([k,l])=>[k,l+' notes','text','']),
 ['notes','Additional notes','text','Keep the outfit complete and fully clothed. Match every garment layer and ensure buckles, belts, and buttons connect plausibly.']
];
export const defaults=Object.fromEntries(fields.map(f=>[f[0],f[3]]));
export const roles=['extraOutfit','torso','lowerBody','weapon','accessories','footwear','hairstyle','headwear','pose','expression'];
export function validateSettings(raw={}) {
 if(!raw || typeof raw!=='object' || Array.isArray(raw))throw new Error('Invalid settings.');
 const s={...defaults};
 for(const [key,,type,,options,max] of fields){
  if(!(key in raw))continue;const v=raw[key];
  if(type==='boolean'&&typeof v!=='boolean')throw new Error('Invalid '+key);
  if(type==='select'&&!options.map(x=>Array.isArray(x)?x[0]:x).includes(v))throw new Error('Invalid '+key);
  if(type==='number'&&(!Number.isInteger(v)||v<options||v>max))throw new Error('Invalid '+key);
  if(type==='text'&&(typeof v!=='string'||v.length>2000))throw new Error(key+' is too long.');
  s[key]=v;
 }
 if(s.model==='gpt-image-2'&&['xhigh','max'].includes(s.quality))s.quality='high';
 if(s.speedProfile==='turbo'){s.refinePasses=0;s.constructionPass=false;s.upperBodyPass=false;s.lowerBodyPass=false;s.accessoryPass=false;if(['xhigh','max'].includes(s.quality))s.quality='high';}
 if(s.speedProfile==='balanced'){s.refinePasses=Math.min(s.refinePasses,1);if(s.quality==='max')s.quality='high';}
 if(s.speedProfile==='fidelity'&&['auto','low'].includes(s.quality))s.quality='high';
 return s;
}
export function stages(s){return [s.sourceMode==='original'?'before':'prepare',...(s.retryBadProportions?['proportions']:[]),'mask',...(s.reviewMask?['review']:[]),'swap',...(s.upperBodyPass?['upper']:[]),...(s.lowerBodyPass?['lower']:[]),...(s.accessoryPass?['accessories']:[]),...Array.from({length:s.refinePasses},(_,i)=>'detail'+(i+1)),...(s.constructionPass?['construction']:[]),...(s.handRepair!=='off'?['hands']:[]),...(s.correctFinalAnatomy?['anatomy']:[]),...(s.finishInSelectedStyle&&s.look!=='preserve'?['style']:[]),...(s.finalCheck!=='off'?['check']:[]),'finish'];}
export const labels={before:'Creating the full-body portrait',prepare:'Preparing your full-body image',proportions:'Checking proportions',mask:'Preparing the editable mask',review:'Review your mask',swap:'Creating the new outfit',upper:'Refining upper body',lower:'Refining lower body',accessories:'Refining accessories',construction:'Cleaning up construction',hands:'Checking hands',anatomy:'Refining anatomy',style:'Finishing the selected style',check:'Checking the final image',finish:'Saving your portrait'};
