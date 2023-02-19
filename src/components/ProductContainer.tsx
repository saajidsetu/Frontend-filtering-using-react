import { run } from 'core/utils';
import React, { useEffect, useState } from 'react';
export default function ProductContainer() {
  const [product, setPorduct] = useState([])
  const [url, seturl] = useState('')


  useEffect(() => {

    const getItems: any = run();
    const items = getItems.data || [];

    console.log("iteffffffms", items);

    setPorduct(items)
    // seturl('')
    const params: any = new URLSearchParams(window.location.search);
    seturl(params)
  }, [url])


  return (
    <div className="w-75">
      <div className="flex flex-wrap product-grid pt2">
        {
          product.map((item: any) =>
            <div key={item.id} className="w-100 w-50-l ph3">
              <a className="link black hover-light-purple" href="/t">
                <div className="flex flex-column h-100">
                  <img
                    style={{ objectFit: 'cover', height: '420px' }}
                    alt=""
                    loading="lazy"
                    className="img flex-auto bg-gray"
                    src={item.src}
                  />

                  <div className="pt3 pb5 flex flex-column">
                    <b className="mb1">{item.name}</b>
                    <i className="mb3 gray">{item.color}</i>
                    <i className="mb3 gray">{item.storage}</i>
                    <p className="ma0 b black">${item.price}</p>
                  </div>
                </div>
              </a>
            </div>



          )
        }
      </div>
    </div>
  )

}
// export default ProductContainer();