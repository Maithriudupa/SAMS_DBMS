import React from 'react';

import Grid from '@material-ui/core/Grid';
import CardsStudent from "./Cards/AboutStudentPage";
import CardsLecture from "./Cards/AboutLecturePage";
import CardsAdmin from "./Cards/AboutAdminPage";
import { useSpring, animated } from 'react-spring'

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`


export default function Card() {
    const [a, seta] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
    const [b, setb] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
    const [c, setc] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
    return (
        <Grid container  direction="row"
        justify="space-between"
        alignItems="center">
   <animated.div
 
  onMouseMove={({ clientX: x, clientY: y }) => seta({ xys: calc(x, y) })}
  onMouseLeave={() => seta({ xys: [0, 0, 1] })}
  style={{ transform: a.xys.interpolate(trans) }}
>
      <CardsAdmin/>
      </animated.div>
      <animated.div
 
 onMouseMove={({ clientX: x, clientY: y }) => setb({ xys: calc(x, y) })}
 onMouseLeave={() => setb({ xys: [0, 0, 1] })}
 style={{ transform: b.xys.interpolate(trans) }}
>
      <CardsLecture/>
    </animated.div>
    <animated.div
 
 onMouseMove={({ clientX: x, clientY: y }) => setc({ xys: calc(x, y) })}
 onMouseLeave={() => setc({ xys: [0, 0, 1] })}
 style={{ transform: c.xys.interpolate(trans) }}
>
     <CardsStudent/>
     </animated.div>
  </Grid>
    )
  }