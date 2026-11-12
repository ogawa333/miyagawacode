"use client";

import {useEffect,useState} from "react";
import {TsunosukeAdventure} from "./tsunosuke-adventure";
import {DonburiMark} from "./donburi-art";
import {NatureDesignMark} from "./nature-design-art";
import {LocalDesignMark} from "./local-design-art";

// Add future designs here; each id corresponds to a scoped CSS theme.
const designs=[
 {id:"sea",name:"海",caption:"波と光の、さわやかな青",eyebrow:"SEASIDE",icon:"wave"},
 {id:"tuna",name:"マグロ",caption:"港の紺と、マグロの朱色",eyebrow:"MISAKI TUNA",icon:"fish"},
 {id:"site",name:"サイトの世界観",caption:"アイボリーと青、あたたかな朱色",eyebrow:"MIURA WALK",icon:"route"},
 {id:"tsunosuke",name:"三浦ツナ之介",caption:"ツナ之介と出陣！まぐろパワーで三崎探検",eyebrow:"TSUNANOSUKE",icon:"tsunosuke"},
 {id:"miuran",name:"みうらん",caption:"満開の桜と花びら、春色のおさんぽ",eyebrow:"MIURAN",icon:"miuran"},
 {id:"farm",name:"三浦やさい畑",caption:"大根とキャベツ、緑いっぱいの畑へ",eyebrow:"MIURA FARM",icon:"farm"},
 {id:"retro",name:"三崎レトロさんぽ",caption:"絵はがきのような、懐かしい街歩き",eyebrow:"MISAKI RETRO",icon:"retro"},
 {id:"festival",name:"チャッキラコ・和のおまつり",caption:"扇と五色の飾り、華やかな和の世界",eyebrow:"CHAKKIRAKO",icon:"festival"},
 {id:"lighthouse",name:"城ヶ島・灯台のあかり",caption:"白い灯台と岩礁、あかりをたどる旅",eyebrow:"JOGASHIMA LIGHT",icon:"lighthouse"},
 {id:"watermelon",name:"三浦すいか・夏やすみ",caption:"すいかとメロン、夏色いっぱいの冒険",eyebrow:"MIURA SUMMER",icon:"watermelon"},
 {id:"forest",name:"小網代の森・カニの探検隊",caption:"木漏れ日とアカテガニ、森の探検へ",eyebrow:"KOAJIRO FOREST",icon:"forest"},
 {id:"donburi",name:"三崎マグロ丼",caption:"まぐろの赤と炊きたてご飯、おいしい三崎",eyebrow:"MISAKI MAGURO DON",icon:"donburi"},
] as const;
export type WalkDesign=typeof designs[number]["id"];
const storageKey="miura-walk-design-v1";
export function useWalkDesign(){
 const [design,setDesign]=useState<WalkDesign>("site");
 useEffect(()=>{try{const value=localStorage.getItem(storageKey);if(designs.some(d=>d.id===value))setDesign(value as WalkDesign)}catch{/* The selection still works when storage is unavailable. */}},[]);
 function choose(value:WalkDesign){setDesign(value);try{localStorage.setItem(storageKey,value)}catch{/* Keep the current in-memory selection. */}}
 return [design,choose] as const;
}
export type MapDesign="follow"|WalkDesign;
export function useMapDesign(){
 const [design,setDesign]=useState<MapDesign>("follow");
 useEffect(()=>{try{const value=localStorage.getItem("miura-map-design-v1");if(value==="follow"||designs.some(d=>d.id===value))setDesign(value as MapDesign)}catch{/* Use the screen design when storage is unavailable. */}},[]);
 function choose(value:MapDesign){setDesign(value);try{localStorage.setItem("miura-map-design-v1",value)}catch{/* Keep the selection for this visit. */}}
 return [design,choose] as const;
}
export function MapDesignSelector({value,onChange}:{value:MapDesign;onChange:(value:MapDesign)=>void}){
 const captions={donburi:"ご飯色の地図に、まぐろと薬味の彩り",lighthouse:"灯台の光と岩礁、砂色の地図",watermelon:"すいかの種と葉っぱ、夏色の地図",forest:"木漏れ日とカニ、木札風の目印",sea:"水色の道路と建物、青い目印ラベル",tuna:"生成りの地図、紺のラベルと朱色の記号",site:"落ち着いた道路と、紙のような目印ラベル",tsunosuke:"ツナ之介と赤い甲冑が彩る冒険地図",miuran:"桜の花と花びらに包まれる地図",farm:"畑の畝と野菜、若草色の建物",retro:"紙の地図と、木枠の看板風ラベル",festival:"扇と五色の飾り、和紙風の目印"};
 return <fieldset className="walk-design-selector map-design-selector"><legend>地図のデザイン</legend><p className="walk-design-intro">地図の中の道路・建物・目印の見た目を選べます。</p>
  <label className="map-design-follow"><input type="radio" name="map-design" value="follow" checked={value==="follow"} onChange={()=>onChange("follow")}/>画面のデザインに合わせる</label>
  <div className="walk-design-options">{designs.map(design=><label className={"walk-design-option design-"+design.id} key={design.id}>
   <input type="radio" name="map-design" value={design.id} checked={value===design.id} onChange={()=>onChange(design.id)}/>
   <span className="walk-design-preview map-design-preview" aria-hidden="true"><svg viewBox="0 0 100 76"><rect className="map-preview-building" x="18" y="10" width="19" height="17" rx="1"/><rect className="map-preview-building" x="64" y="48" width="21" height="15" rx="1"/><path className="map-preview-road" d="M48 68V35H9m39 0h43M48 35V5"/><path className="map-preview-route" d="M48 65V35H19"/><path className="map-preview-arrow" d="m21 30-10 5 10 5Z"/><circle className="map-preview-dot" cx="48" cy="65" r="3"/><rect className="map-preview-label" x="57" y="12" width="34" height="16" rx="3"/><path className="map-preview-symbol" d="M62 16h7m-6 3h5m-4-3v9m3-9v9"/><path className="map-preview-name" d="M74 18h11m-11 5h7"/></svg>{(design.id==="tsunosuke"||design.id==="miuran"||design.id==="farm"||design.id==="retro"||design.id==="festival"||design.id==="lighthouse"||design.id==="watermelon"||design.id==="forest"||design.id==="donburi")&&<span className="map-preview-character"><DesignMark kind={design.icon}/></span>}</span>
   <span className="walk-design-copy"><strong>{design.name}</strong><span>{captions[design.id]}</span></span><span className="walk-design-check" aria-hidden="true">✓</span>
  </label>)}</div><p className="walk-design-current" role="status">地図：{value==="follow"?"画面のデザインに合わせる":designs.find(d=>d.id===value)?.name}</p>
 </fieldset>;
}
export function DesignMark({kind}:{kind:typeof designs[number]["icon"]}){
 if(kind==="donburi")return <DonburiMark/>;
 if(kind==="lighthouse"||kind==="watermelon"||kind==="forest")return <NatureDesignMark kind={kind}/>;
 if(kind==="farm"||kind==="retro"||kind==="festival")return <LocalDesignMark kind={kind}/>;
 if(kind==="tsunosuke"||kind==="miuran")return <img className="walk-character-art" src={"/characters/"+kind+".jpg"} alt="" width={kind==="tsunosuke"?230:250} height={kind==="tsunosuke"?275:279} decoding="async"/>;
 return <svg viewBox="0 0 100 48" fill="none" aria-hidden="true">
  {kind==="wave"?<><circle cx="77" cy="12" r="6" fill="currentColor" opacity=".35"/><path d="M4 28c12-14 20 14 32 0s20 14 32 0 20 14 30 0M4 39c12-14 20 14 32 0s20 14 32 0 20 14 30 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></>:kind==="fish"?<><path d="M18 25C34 5 61 5 76 24L94 12l-4 13 4 13-18-12C58 44 34 43 18 25Z" fill="currentColor"/><path d="m46 12 9-9 5 12M44 37l10 8 4-11" fill="currentColor"/><circle cx="31" cy="23" r="2" fill="var(--preview-paper)"/><path d="M42 17q-5 8 0 16" stroke="var(--preview-paper)" strokeWidth="1.5"/></>:<><path d="M25 39V23h44V8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="25" cy="39" r="4" fill="currentColor"/><path d="m62 14 7-7 7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 23h10m60 0h16M48 5v10m0 16v11" stroke="currentColor" opacity=".25" strokeWidth="3" strokeLinecap="round"/></>}
 </svg>;
}
export function WalkDesignStamp({design,sequence=1}:{design:WalkDesign;sequence?:number}){
 if(design==="tsunosuke")return <TsunosukeAdventure sequence={sequence}/>;
 const selected=designs.find(d=>d.id===design)!;
 const taglines={donburi:"おいしい三崎を、ひとコマずつ。",lighthouse:"灯台のあかりと、岩礁の島へ。",watermelon:"夏の実りと、はじけるおさんぽ。",forest:"赤いカニと、木漏れ日の探検へ。",tsunosuke:"海風と、まぐろのまちを探検。",miuran:"桜の風にのって、まちをおさんぽ。",farm:"葉っぱの風と、畑のまちへ。",retro:"路地の向こうに、懐かしい三崎。",festival:"扇と五色に誘われて、まちめぐり。"};
 return <div className="walk-design-stamp" aria-hidden="true"><DesignMark kind={selected.icon}/><span>{design==="miuran"||design==="farm"||design==="retro"||design==="festival"||design==="lighthouse"||design==="watermelon"||design==="forest"||design==="donburi"?<><strong>{selected.name}</strong><small>{taglines[design]}</small></>:design==="sea"?"SEASIDE WALK":design==="tuna"?"MISAKI TUNA WALK":"MIURA WALKING RALLY"}</span></div>;
}
export function MapCharacterBadge({design,screen}:{design:WalkDesign;screen:WalkDesign}){
 if((design!=="tsunosuke"&&design!=="miuran")||design===screen)return null;
 return <div className="walk-map-character" aria-hidden="true"><DesignMark kind={design}/><span>{design==="tsunosuke"?"三浦ツナ之介":"みうらん"}</span></div>;
}
export default function WalkDesignSelector({value,onChange}:{value:WalkDesign;onChange:(value:WalkDesign)=>void}){
 return <fieldset className="walk-design-selector"><legend>画面のデザイン</legend><p className="walk-design-intro">今日の気分で、歩く画面を着替えよう。</p><div className="walk-design-options">
  {designs.map(design=><label className={"walk-design-option design-"+design.id} key={design.id}>
   <input type="radio" name="walk-design" value={design.id} checked={value===design.id} onChange={()=>onChange(design.id)}/>
   <span className="walk-design-preview"><span>{design.eyebrow}</span><DesignMark kind={design.icon}/><span className="walk-design-mini-button"/></span>
   <span className="walk-design-copy"><strong>{design.name}</strong><span>{design.caption}</span></span><span className="walk-design-check" aria-hidden="true">✓</span>
  </label>)}
 </div><p className="walk-design-current" role="status">選択中：{designs.find(d=>d.id===value)?.name}</p></fieldset>;
}
