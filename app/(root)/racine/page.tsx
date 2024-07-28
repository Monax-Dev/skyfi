import CardCompagnyLink from '@/components/us/cardCompagnyLink'
import React from 'react'

const data = [
    {
        name: 'Skypiea Records',
        email: 'skypiearecords@skypieaent.sn',
        tel: '33 000 00 00',
        address: 'Ouest Foire, Dakar',
        chiffreAffaires: 1000000000000000
    },
    {
        name: 'Skypiea Visuels',
        email: 'skypieavisuels@skypieaent.sn',
        tel: '33 000 00 00',
        address: 'Ouest Foire, Dakar',
        chiffreAffaires: 1000000000000000
    },
    {
        name: 'Skypiea Shop',
        email: 'skypieashop@skypieaent.sn',
        tel: '33 000 00 00',
        address: 'Ouest Foire, Dakar',
        chiffreAffaires: 1000000000000000
    }
]

export default function page() {
  return (
    <div className='h-screen w-full overflow-hidden flex flex-col px-8 py-12 space-y-12'>
       <div>
              <h1 className='text-3xl font-bold'>Mes Compagnies</h1>
       </div>
        <div className='container mx-auto w-full flex items-start gap-4 flex-wrap justify-center lg:justify-normal'>
           {
                data.map((compagny, index) => (
                    <CardCompagnyLink key={index} compagny={compagny}/>
                ))
           }
        </div>
    </div>
  )
}
