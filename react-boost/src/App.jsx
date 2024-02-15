import React, { lazy } from 'react'
import '../src/App.css'
import { Suspense } from 'react'

const Comp = lazy(()=>(import('./Comp.jsx')))
const CompText = lazy(()=>import('./CompText.jsx'))


export default function App() {
  return (
   <> 
   <Suspense fallback={<div>Loading..</div>}>
   <CompText/>
   <Comp/>
   </Suspense>

   </>
  )
}
