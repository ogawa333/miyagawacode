import {TsunosukeMapScenery,TsunosukeScreenScenery} from "./tsunosuke-adventure";
import {DonburiMapScenery,DonburiScreenScenery} from "./donburi-art";
import {NatureMapScenery,NatureScreenScenery} from "./nature-design-art";
import {LocalMapScenery,LocalScreenScenery} from "./local-design-art";
/** Decorative scenery only. Render below geographic features, never as map data. */
function Tuna({x,y,scale=1,flip=false}:{x:number;y:number;scale?:number;flip?:boolean}){
 return <g transform={`translate(${x} ${y}) scale(${flip?-scale:scale} ${scale})`}>
  <path d="M-27 0C-11-17 12-17 26 0L40-12 36 0l4 12-14-11C8 17-12 15-27 0Z" fill="currentColor"/>
  <path d="m-5-10 11-10 3 12M-4 11l11 8 3-10" fill="currentColor"/>
  <circle cx="-16" cy="-2" r="1.7" fill="var(--scene-eye,#fff)"/>
  <path d="M-7-8q-5 8 0 16" stroke="var(--scene-eye,#fff)" strokeWidth="1.2" fill="none"/>
 </g>;
}
function Blossom({x,y,size=1,rotate=0}:{x:number;y:number;size?:number;rotate?:number}){
 return <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size})`}>
  {[0,72,144,216,288].map(angle=><path key={angle} transform={`rotate(${angle})`} d="M0 1C-11-4-12-14-5-18L0-14l5-4C12-14 11-4 0 1Z" fill="currentColor"/>) }
  <circle r="3" fill="var(--scene-center,#d69a46)"/>
  {[0,72,144,216,288].map(angle=><path key={angle} transform={`rotate(${angle})`} d="M0-2v-5" stroke="var(--scene-center,#d69a46)" strokeWidth=".8"/>)}
 </g>;
}
export function MapAtmosphere({id}:{id:string}){
 return <g className="map-atmosphere" aria-hidden="true" pointerEvents="none">
  <defs><clipPath id={id}><rect x="2" y="2" width="296" height="276" rx="13"/></clipPath></defs>
  <g clipPath={`url(#${id})`}>
   <LocalMapScenery/><NatureMapScenery/><DonburiMapScenery/><TsunosukeMapScenery/>
   <g className="map-atmosphere-ocean">
    <path d="M0 240Q38 223 76 240t76 0 76 0 76 0V280H0Z" fill="var(--scene-wave-light)"/>
    <path d="M0 257Q38 241 76 257t76 0 76 0 76 0V280H0Z" fill="var(--scene-wave)"/>
    <path d="M9 27q10-8 20 0t20 0M231 23q10-8 20 0t20 0M15 248q11-7 22 0t22 0M194 263q11-7 22 0t22 0" stroke="var(--scene-foam)" strokeWidth="1.4" fill="none"/>
    <g className="map-atmosphere-fish"><Tuna x={255} y={49} scale={.48} flip/><Tuna x={36} y={215} scale={.42}/><Tuna x={257} y={258} scale={.46}/></g>
    <g fill="none" stroke="var(--scene-bubble)" strokeWidth=".9"><circle cx="275" cy="199" r="4"/><circle cx="282" cy="186" r="2.5"/><circle cx="20" cy="69" r="3"/><circle cx="25" cy="59" r="1.5"/></g>
   </g>
   <g className="map-atmosphere-sakura">
    <path d="M300 0q-30 13-55 6M288 4q-2 17-14 24M0 280q35-9 45-35" fill="none" stroke="var(--scene-branch)" strokeWidth="2"/>
    <g className="map-atmosphere-blossoms"><Blossom x={270} y={18} size={.78}/><Blossom x={245} y={9} size={.48} rotate={20}/><Blossom x={290} y={40} size={.5} rotate={30}/><Blossom x={21} y={252} size={.75} rotate={-15}/><Blossom x={42} y={239} size={.4}/></g>
    <g fill="var(--scene-petal)"><path d="M17 38q16-1 8 16-13-4-8-16M266 218q15 1 7 16-13-5-7-16M73 260q16-3 9 14-13-2-9-14M225 57q11-2 6 10-9-1-6-10"/></g>
    <path d="M0 272q72-18 150 0t150-2v12H0Z" fill="var(--scene-petal-bed)"/>
   </g>
  </g>
 </g>;
}
export default function WalkAtmosphere(){
 return <div className="walk-surroundings" aria-hidden="true"><svg viewBox="0 0 500 900" preserveAspectRatio="xMidYMid slice" focusable="false">
  <LocalScreenScenery/><NatureScreenScenery/><DonburiScreenScenery/><TsunosukeScreenScenery/>
  <g className="walk-ocean-scenery">
   <path d="M0 720q60-30 125 0t125 0 125 0 125 0v180H0Z" fill="#5ab3ce" opacity=".16"/>
   <path d="M0 780q60-30 125 0t125 0 125 0 125 0v120H0Z" fill="#227f9b" opacity=".14"/>
   <g fill="none" stroke="#fff" strokeWidth="2" opacity=".5"><path d="M-20 745q30-17 60 0t60 0M350 810q30-17 60 0t60 0"/><circle cx="25" cy="205" r="8"/><circle cx="37" cy="181" r="4"/><circle cx="474" cy="585" r="7"/></g>
   <g color="#367e9e" opacity=".18"><Tuna x={25} y={325} scale={.7}/><Tuna x={485} y={655} scale={.85} flip/><Tuna x={100} y={850} scale={.6}/></g>
  </g>
  <g className="walk-sakura-scenery">
   <path d="M500 90q-38 6-60-25t-53-23M452 76q-7-27-24-47" fill="none" stroke="#9d6574" strokeWidth="3" opacity=".22"/>
   <g color="#d96b9c" opacity=".38"><Blossom x={466} y={66} size={1.2}/><Blossom x={426} y={37} size={.85}/><Blossom x={496} y={105} size={1.1}/><Blossom x={12} y={640} size={1.3}/><Blossom x={45} y={663} size={.8}/><Blossom x={478} y={760} size={.75}/></g>
   <g fill="#e78bb1" opacity=".45"><path d="M40 200q20-2 10 20-17-6-10-20M469 290q20-2 10 20-17-6-10-20M37 472q15-1 8 14-13-4-8-14M445 860q15-1 8 14-13-4-8-14"/></g>
   <path d="M0 875q100-35 200-8t300-20v53H0Z" fill="#a8c88b" opacity=".2"/>
  </g>
 </svg></div>;
}
