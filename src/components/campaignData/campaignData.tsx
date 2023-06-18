"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import CampaignCard from '../campaignCard'
import { useGetCampaignDB, Campaign } from '@/hooks/useGetCampaignDB'

const CampaignData = ({ isAll }: { isAll: boolean }) => {
  const { allCampaign, myCampaign } = useGetCampaignDB()
  const [data, setData] = React.useState<Array<Campaign>>([])

  useEffect(() => {
    if (isAll) {
      setData(allCampaign)
    } else {
      setData(myCampaign)
    }
  }, [isAll, allCampaign, myCampaign])

  return (
    <div className="flex justify-center overflow-x-auto">
      <div className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        {data?.map((item, index) => (
          <Link
            key={index}
            href={{
              pathname: '/campaign',
              query: { id: item.id },
            }}
          >
            <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
              <CampaignCard
                id={item.id}
                title={'title'}
                description={'description'}
                image={`https://dweb.link/ipfs/${item.imgCid}`}
                status={item.status}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CampaignData
