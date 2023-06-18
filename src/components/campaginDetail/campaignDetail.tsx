import Image from 'next/image'

const index = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center text-white py-5 px-4 space-y-6 md:space-y-0 md:space-x-6">
        <div className="relative w-full md:w-[965px] h-[447px] rounded-xl bg-[url('/assets/home.png')] bg-cover bg-center">
          <div className="flex flex-col  text-center md:px-7 md:mt-28 justify-center md:items-start h-full">
            <div className="font-bold text-3xl md:text-7xl text-white">New</div>
            <div className="font-bold text-3xl md:text-7xl text-white">Campaign</div>

            <div className="py-10 flex justify-center md:justify-start">
              <button className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl drop-shadow-lg h-[40px] w-[250px] md:h-[50px] md:w-[300px]">
                <div className="text-white">Explore Now.</div>
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-full md:w-[365px] h-[447px] bg-[url('/assets/cardbg.png')] rounded-xl">
          <div>
            <div className="mt-2 space-y-2">
              <div className="text-xl md:text-3xl font-bold text-white">Leader Board</div>
              <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
            </div>

            <div className="px-6 mt-6 space-y-10">
              <div className="w-full md:w-[295px] h-[40px] md:h-[50px] bg-gradient-to-br from-blue-800 via-purple-900 to-blue-800 rounded-xl">
                <div className="flex flex-row space-x-4">
                  <div className="">
                    <Image
                      src="/assets/Ellipse 6.png"
                      width={70}
                      height={70}
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

              <div className="w-full md:w-[295px] h-[40px] md:h-[50px] bg-gradient-to-br from-blue-800 via-purple-900 to-blue-800 rounded-xl">
                <div className="flex flex-row space-x-4">
                  <div className="">
                    <Image
                      src="/assets/Ellipse 6.png"
                      width={70}
                      height={70}
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

              <div className="w-full md:w-[295px] h-[40px] md:h-[50px] bg-gradient-to-br from-blue-800 via-purple-900 to-blue-800 rounded-xl">
                <div className="flex flex-row space-x-4">
                  <div className="">
                    <Image
                      src="/assets/Ellipse 6.png"
                      width={70}
                      height={70}
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

              <div className="flex justify-center items-center text-center">
                <button className="duration-300 transform hover:scale-125 transition ease-linear bg-[url('/assets/Button.png')] h-[40px] w-[200px] md:h-[50px] md:w-[250px]"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default index;
