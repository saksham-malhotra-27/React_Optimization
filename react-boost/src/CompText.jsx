import React, {useEffect} from 'react'


function CompText() {
  
    const url = 'https://dummyjson.com/users/1';
    
    useEffect(() => {
        document.getElementById('targetFetch').innerHTML = 'Click here to fetch';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.getElementById('targetFetchc').innerHTML = 'Click here to fetch';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const clickToFetch = () => {
        const initial = performance.now();
        let final;
        fetch(url)
            .then(res => {
                final = performance.now();
                return res.json();
            })
            .then(data => {
                const { id, firstName, lastName, email, phone } = data;
                const userInfo = `
                    <p>ID: ${id}</p>
                    <p>Name: ${firstName} ${lastName}</p>
                    <p>Email: ${email}</p>
                    <p>Phone: ${phone}</p>
                    <p>Initial: ${Math.floor(initial)} ms</p>
                    <p>Final: ${Math.floor(final)} ms</p>
                    <p>Difference: ${Math.floor(final - initial)} ms</p>
                `;
                document.getElementById('targetFetch').innerHTML = userInfo;
            })
            .catch(error => console.error('Error fetching user data:', error));
    }
    
    
    // Fetching the data via cache
    const buttonForFetchViaCache = document.getElementById('forFetchc');
    
    const cacheName = 'cache1';
    
    const clickToFetchCache = () => {
        const initial = performance.now();
        let final = 0;
        caches.open(cacheName)
            .then(cache => {
                cache.match(url)
                    .then(resp => {
                        final=performance.now()
                        if (resp && resp.ok) { // Check if response exists and is OK
                            final = Math.floor(performance.now());
                            let respt;
                            return resp.text().then(resptext => {
                                resptext += `
                                    <p>final : ${final}</p>
                                    <p>initial : ${Math.floor(initial)}</p>
                                    <p>diff: ${Math.floor(final-initial)}</p>
                                `;
                               return resptext // Get the response as text (HTML)
                            });
    
                        } else {
                            fetch(url)
                                .then(res => {
                                    final = performance.now();
                                    return res.json();
                                })
                                .then(data => {
                                    const { id, firstName, lastName, email, phone } = data;
                                    const userInfo = `
                                        <p>ID: ${id}</p>
                                        <p>Name: ${firstName} ${lastName}</p>
                                        <p>Email: ${email}</p>
                                        <p>Phone: ${phone}</p>
                                        <p>Initial: ${Math.floor(initial)} ms</p>
                                        <p>Final: ${Math.floor(final)} ms</p>
                                        <p>Difference: ${Math.floor(performance.now() - initial)} ms</p>
                                    `;
                                    document.getElementById('targetFetchc').innerHTML = userInfo;
                                    return userInfo;
                                })
                                .then(userInfo => {
                                    // Store data in the cache
                                    cache.put(url, new Response(userInfo)); // Store HTML content in the cache
                                })
                                .catch(error => console.error('Error fetching user data:', error));
                        }
                    })
                    .then(htmlContent => {
                        // Set the cached HTML content to the target element
                        document.getElementById('targetFetchc').innerHTML = htmlContent;
                    })
                    .catch(error => console.error('Error fetching user data:', error));
            })
            .catch(err => {
                console.error(err);
            });
    }

  return (
    <>
    <div id="directText">
      <div id="root">
        <h1 > For Fetching data from API Directly</h1>
      </div>
      <div id="fetch">
        <button id="forFetch" onClick={clickToFetch}>Fetch data</button>
        <div id="targetFetch"></div>
      </div>
    </div>
    <div id="cacheText">
      <div id="root">
        <h1 > For Fetching data from API via checking Cache</h1>
      </div>
      <div id="fetchc">
        <button id="forFetchc" onClick={clickToFetchCache}>Fetch data</button>
        <div id="targetFetchc"></div>
      </div>
    </div>
    </>
  )
}

export default CompText