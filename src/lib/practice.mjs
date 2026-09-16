export const shuffle=list=>{const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const n=x=>Number(x.toFixed(3)).toString();
const questions=[];
const add=(topic,q,value,unit,why)=>{const correct=n(value)+' '+unit;const distractors=[value*2,value/2,value+3,value+7].map(v=>n(v)+' '+unit).filter((v,i,a)=>v!==correct&&a.indexOf(v)===i).slice(0,3);questions.push({topic,q,choices:[correct,...distractors],answer:0,why});};
for(let k=1;k<=5;k++){
 add('motion',`An object moves at ${k+2} m/s for 4 s. How far does it travel?`,(k+2)*4,'m',`For constant velocity, distance = speed × time = ${k+2} × 4 = ${(k+2)*4} m.`);
 add('motion',`Starting from rest, an object accelerates at ${k} m/s² for 3 s. What is its speed?`,k*3,'m/s',`v = v₀ + at = 0 + ${k} × 3 = ${k*3} m/s.`);
 add('motion',`A ball is launched horizontally at ${k+3} m/s. Ignoring air resistance, how far does it move horizontally in 2 s?`,(k+3)*2,'m',`Horizontal velocity stays constant: x = vₓt = ${k+3} × 2 = ${(k+3)*2} m.`);
 add('motion',`An object starts from rest with constant acceleration 2 m/s². What is its displacement after ${k} s?`,k*k,'m',`x = ½at² = ½ × 2 × ${k}² = ${k*k} m.`);
 add('energy',`A ${k+1} kg object experiences a net force of ${(k+1)*3} N. What is its acceleration?`,3,'m/s²',`Newton’s second law gives a = Fnet/m = ${(k+1)*3}/${k+1} = 3 m/s².`);
 add('energy',`Using g = 10 m/s², what is the potential energy of a ${k} kg mass raised 3 m?`,k*30,'J',`Eₚ = mgh = ${k} × 10 × 3 = ${k*30} J.`);
 add('energy',`A ${k} kg object travels at 4 m/s. What is its kinetic energy?`,k*8,'J',`Eₖ = ½mv² = ½ × ${k} × 16 = ${k*8} J.`);
 add('energy',`A block has a normal force of ${k*20} N and static friction coefficient 0.5. What is its maximum static friction?`,k*10,'N',`Maximum static friction = μsN = 0.5 × ${k*20} = ${k*10} N. Actual static friction can be smaller.`);
 add('waves',`A wave has frequency ${k} Hz and wavelength 3 m. What is its speed?`,k*3,'m/s',`v = fλ = ${k} × 3 = ${k*3} m/s.`);
 add('waves',`A source completes ${k*6} cycles in 3 s. What is its frequency?`,k*2,'Hz',`Frequency = cycles / time = ${k*6}/3 = ${k*2} Hz.`);
 add('waves',`A wave travels at ${k*8} m/s with frequency 4 Hz. What is its wavelength?`,k*2,'m',`λ = v/f = ${k*8}/4 = ${k*2} m.`);
 add('waves',`An ideal spring has stiffness ${k*10} N/m and is stretched 0.2 m. What is the restoring-force magnitude?`,k*2,'N',`|F| = k|x| = ${k*10} × 0.2 = ${k*2} N. The force points toward equilibrium.`);
 add('electricity',`A ${k*10} Ω resistor carries 0.2 A. What is the voltage across it?`,k*2,'V',`V = IR = 0.2 × ${k*10} = ${k*2} V.`);
 add('electricity',`A component has ${k*4} V across it and carries 0.5 A. How much power does it transfer?`,k*2,'W',`P = VI = ${k*4} × 0.5 = ${k*2} W.`);
 add('electricity',`Two resistors, ${k*10} Ω and 20 Ω, are connected in series. What is their equivalent resistance?`,k*10+20,'Ω',`In series, resistances add: ${k*10} + 20 = ${k*10+20} Ω.`);
 add('electricity',`Two equal ${k*20} Ω resistors are in parallel. What is their equivalent resistance?`,k*10,'Ω',`For two equal resistors in parallel, equivalent resistance is half either resistance: ${k*20}/2 = ${k*10} Ω.`);
 add('optics',`A ray in air meets a glass surface at an angle of ${k*10}° to the normal. What is its angle to the surface?`,90-k*10,'°',`The surface and normal are perpendicular, so the angle to the surface is 90° − ${k*10}° = ${90-k*10}°.`);
 add('optics',`An object is ${k*10} cm from a lens with focal length ${k*5} cm. What is the image distance?`,k*10,'cm',`The object is at 2f. From 1/f = 1/dₒ + 1/dᵢ, the real image is also at 2f = ${k*10} cm.`);
 add('optics',`An image is ${k*2} cm tall and its object is ${k} cm tall. What is the magnitude of magnification?`,2,'×',`|M| = image height / object height = ${k*2}/${k} = 2.`);
 add('optics',`A converging lens forms an image with magnification −2 of an object ${k} cm tall. What is the image-height magnitude?`,k*2,'cm',`Image-height magnitude = |M| × object height = 2 × ${k} = ${k*2} cm. The minus sign indicates inversion.`);
}
export const QUESTIONS=questions;
export function makeRound(topic='mixed',count=8){if(!Number.isInteger(count)||count<1||count>20)throw Error('Choose 1 to 20 questions.');const bank=topic==='mixed'?QUESTIONS:QUESTIONS.filter(q=>q.topic===topic);if(bank.length<count)throw Error('Not enough questions in that topic.');return shuffle(bank).slice(0,count).map(q=>({...q,choices:shuffle(q.choices.map((text,i)=>({text,correct:i===q.answer})))}));}
