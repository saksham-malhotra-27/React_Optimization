import React, { useEffect, useRef } from 'react';

const Comp = () => {
  const size = 5;
  const reference  = useRef(0)
  const referenceLazyI = useRef(0)
  useEffect(() => {
    // W/O lazy loading
    if(!reference.current){
      reference.current = 1
      return;
    }
    console.log('hi');
    const imgDiv = document.getElementById('imgVids');
    const fetchImagesDirectly = async () => {
      const init = performance.now();
      const imgUrls = [];
      const fetchPromises = [];
      for (let i = 0; i < size; i++) {
        imgUrls.length = 0; // Clear imgUrls before each fetch
        fetchPromises.push(fetch('https://api.thecatapi.com/v1/images/search?').then(res => res.json()).then(data => {
          imgUrls.push(data[0].url);
        }));
      }

      Promise.all(fetchPromises).then(() => {
        imgUrls.forEach(url => {
          const img = document.createElement('img');
          img.src = url;
          img.className = 'images';
          imgDiv.appendChild(img);
        });

        const result = (performance.now() - init).toFixed(4);
        document.getElementById('imgDiff').innerText += ` ${result}`;
        console.log(result);
      });
    };

    fetchImagesDirectly();
  },[])
  const intersectingImages = useRef([]);


    // Lazy implementation
    useEffect(()=>{
      if(!referenceLazyI.current){
        referenceLazyI.current = 1
        return;
      }
        const lazyDiv = document.getElementById('lazy');
        
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const init = performance.now();
              const img = entry.target;
    
              fetch('https://api.thecatapi.com/v1/images/search?').then(res => res.json()).then(data => {
                const src = data[0].url;
                img.setAttribute('src', src);
                observer.unobserve(img);
                console.log("Img diff: " + (performance.now() - init).toFixed(4));
              });
            }
          });
        }, { throttle: 500 }); 
    
        for (let i = 0; i < size; i++) {
          const img = document.createElement('img');
          img.className = 'images';
          lazyDiv.appendChild(img);
          observer.observe(img);
        }
      }, []);
  return (
    <>
      
        <h1 style={{color:"white", textAlign:"center"}}>Without Lazy Loading</h1>
        <div id="imgVids"></div>
        <p id="imgDiff">Avg Difference: </p>

        <h1 style={{color:"white", textAlign:"center"}}>With Lazy Loading</h1>
        <div id="lazy"></div>
      
    </>
  );
};

export default Comp;
