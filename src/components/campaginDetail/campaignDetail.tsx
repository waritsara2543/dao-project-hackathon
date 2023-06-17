import Image from 'next/image'
const index = () => {
  return (
    <>
      <div className="flex justify-center items-center  space-x-6">
        <div className="relative w-[965px] h-[447px] rounded-xl left-0 top-0 bg-[url('/assets/home.png')] bg-cover bg-center ">
          <div className="flex flex-col px-7   mt-28">
            <div className=" font-bold text-7xl text-white ">New</div>
            <div className=" font-bold text-7xl  text-white ">Campaign</div>

            <div className="py-10">
              {/* <div className="w-72 h-72 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg"></div> */}
              <button className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl drop-shadow-lg h-[50px] w-[300px] ">
                <div className=" text-white">Explore Now.</div>
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-[365px] h-[447px]  bg-gradient-to-br from-blue-800 via-purple-900 to-blue-800 rounded-xl drop-shadow-lg">
          <div>
            <div className=" mt-2 space-y-2 ">
              <div className="text-3xl font-bold text-white">Leader Board</div>
              <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
            </div>

            <div className=" px-6 mt-6 space-y-10 ">
              <div className="w-[295px] h-[50px] bg-gradient-to-br from-blue-800 via-purple-900 to-blue-800  rounded-xl">
                <div className="flex flex-row space-x-4">
                  <div className="">
                    <Image
                      src="/assets/Ellipse 6.png"
                      width={90}
                      height={90}
                      alt={''}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold text-transparent text-sm bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
                      Tee
                    </div>
                    <div className="font-bold text-transparent text-sm bg-clip-text bg-gradient-to-tr from-font-blue via-font-blue to-pink">
                      Sub Title
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[295px] h-[50px] bg-gradient-to-br from-blue-800 via-purple-900 to-blue-800 rounded-xl">
                <div className="flex flex-row space-x-4">
                  <div className="">
                    <Image
                      src="/assets/Ellipse 6.png"
                      width={90}
                      height={90}
                      alt={''}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold text-transparent text-sm bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
                      Tee
                    </div>
                    <div className="font-bold text-transparent text-sm bg-clip-text bg-gradient-to-tr from-font-blue via-font-blue to-pink">
                      Sub Title
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[295px] h-[50px] bg-gradient-to-br from-blue-800 via-purple-900 to-blue-800 rounded-xl">
                <div className="flex flex-row space-x-4">
                  <div className="">
                    <Image
                      src="/assets/Ellipse 6.png"
                      width={90}
                      height={90}
                      alt={''}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold text-transparent text-sm bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
                      Tee
                    </div>
                    <div className="font-bold text-transparent text-sm bg-clip-text bg-gradient-to-tr from-font-blue via-font-blue to-pink">
                      Sub Title
                    </div>
                  </div>
                </div>
              </div>
              <button className=" duration-300 transform hover:scale-125 transition ease-linear bg-gradient-to-tr from-font-pink via-font-blue to-pink h-[50px] w-[300px]  rounded-xl">
                <div className=" text-white">Glass Button</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default index
