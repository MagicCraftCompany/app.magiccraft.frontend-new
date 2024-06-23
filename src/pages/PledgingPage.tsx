
const PledgingPage = () => {
  return(
    <div>
        <div className="relative m-[1.625rem] left-[8.438rem] h-[26.063rem] flex flex-col items-start justify-start text-right text-[1rem]">
          <div className="flex flex-row items-start justify-start">
            <div className="flex flex-row items-center justify-start gap-[0.5rem]">
              <img
                className="w-[1.125rem] relative h-[1.125rem] overflow-hidden shrink-0"
                alt=""
                src="/liarrowupleft.svg"
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-[0.625rem] text-left text-[4.5rem] font-colus">
            <div className="relative leading-[5.625rem] text-transparent !bg-clip-text [background:linear-gradient(180deg,_#fff,_rgba(255,_255,_255,_0.75))] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [text-shadow:0.3px_0_0_#fff,_0_0.3px_0_#fff,_-0.3px_0_0_#fff,_0_-0.3px_0_#fff]">
              MCRT pledging
            </div>
            <div className="w-[22.125rem] relative text-[1.875rem] leading-[2.375rem] font-medium font-futura-pt inline-block">
              TVL: 661 639 136 MCRT
            </div>
          </div>
        <div className="right-[20.438rem] [backdrop-filter:blur(23px)] rounded-xl bg-gray-500 flex flex-col items-start justify-start py-[1.875rem] px-[2.5rem] gap-[0.375rem]">
          <div className="relative leading-[2rem] font-medium">
            Available amount:
          </div>
          <div className="flex flex-row items-end justify-start gap-[0.375rem] text-[2.688rem] font-colus">
            <div className="relative leading-[2.813rem] text-transparent !bg-clip-text [background:linear-gradient(180deg,_#fff,_rgba(255,_255,_255,_0.75))] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [text-shadow:0.5px_0_0_#fff,_0_0.5px_0_#fff,_-0.5px_0_0_#fff,_0_-0.5px_0_#fff]">{`11.92% `}</div>
            <div className="relative text-[1.5rem] leading-[0%]">APR</div>
          </div>
        </div>
        </div>m-[9.625rem]
        <div className=" left-[20.438rem] w-[79.125rem] flex flex-row items-start justify-start gap-[1.875rem]">
          <div className="z-10 w-[45.375rem] shadow-[0px_4px_50px_rgba(10,_9,_23,_0.6)] rounded-xl bg-midnightblue-100 overflow-hidden shrink-0 flex flex-col items-start justify-start">
            <div className="self-stretch bg-gray-300 flex flex-row items-start justify-start p-[2.5rem] gap-[1.875rem]">
              <div className="flex-1 flex flex-col items-start justify-center gap-[1rem]">
                <div className=" leading-[2rem] font-medium">
                  Choose Your Staking Rewards:
                </div>
                <div className="[backdrop-filter:blur(23px)] rounded-11xl bg-slateblue-100 flex flex-row items-center justify-start p-[0.375rem] text-right text-[1rem] text-gray-100">
                  <div className="rounded-47xl bg-fff9 flex flex-row items-center justify-center pt-[0.562rem] pb-[0.625rem] pr-[1.25rem] pl-[1rem] gap-[0.5rem]">
                    <img
                      className="w-[1.125rem]  h-[1.125rem] overflow-hidden shrink-0"
                      alt=""
                      src="/licoins.svg"
                    />
                    <div className=" font-medium">MCRT Token</div>
                  </div>
                  <div className="rounded-47xl flex flex-row items-center justify-center pt-[0.562rem] pb-[0.625rem] pr-[1.25rem] pl-[1rem] gap-[0.5rem] text-fff9">
                    <img
                      className="w-[1.125rem]  h-[1.125rem] overflow-hidden shrink-0"
                      alt=""
                      src="/linft.svg"
                    />
                    <div className=" font-medium">NFT</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-end justify-start gap-[1rem] text-[1.125rem]">
                <div className="w-[6.375rem]  leading-[1.625rem] font-medium flex items-center h-[2rem] shrink-0">
                  Staked MCRT:
                </div>
                <div className="rounded-[64.58px] h-[3.25rem] flex flex-row items-center justify-end gap-[0.5rem] text-[1.5rem] font-colus">
                  <div className="rounded-[64.58px] h-[2.75rem] flex flex-col items-end justify-center">
                    <div className=" leading-[0%]">305 $MCRT</div>
                    <div className="flex flex-row items-center justify-start gap-[0.625rem] mt-[-0.25rem] text-right text-[1.125rem] text-c09aff font-futura-pt">
                      <div className=" leading-[1.625rem] font-medium">
                        From staking started:
                      </div>
                      <div className=" text-[1rem] font-medium text-eff49">
                        +24,56%
                      </div>
                    </div>
                  </div>
                  <div className="w-[3.125rem] rounded-[101px] bg-slateblue-100 h-[3.125rem] flex flex-row items-center justify-center">
                    <img
                      className="w-[2.75rem]  rounded-[72px] h-[2.75rem] object-cover"
                      alt=""
                      src="/image-140@2x.png"
                    />
                  </div>
                </div>
              </div>
            </div>
            <img
              className="self-stretch  max-w-full overflow-hidden h-[0rem] shrink-0"
              alt=""
              src="/div.svg"
            />
            <div className="self-stretch flex flex-col items-start justify-start py-[1.875rem] px-[2.5rem] text-[1.125rem]">
              <div className="self-stretch flex flex-col items-start justify-center gap-[0.75rem]">
                <div className="w-[10rem]  leading-[1.625rem] font-medium inline-block">
                  Token Amount
                </div>
                <div className="self-stretch [backdrop-filter:blur(23px)] rounded-3xs bg-slateblue-200 box-border h-[3.75rem] overflow-hidden shrink-0 flex flex-row items-center justify-start py-[0.375rem] px-[1.25rem] text-[1.375rem] border-[1px] border-solid border-darkslateblue">
                  <div className="flex-1 flex flex-row items-center justify-start gap-[0.5rem]">
                    <div className="flex-1  leading-[1.938rem] font-medium">
                      0
                    </div>
                    <div className=" leading-[1.938rem] font-medium text-fff9">
                      Max
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[80.75rem]  bg-gainsboro h-[1.25rem]" />
              <div className="self-stretch flex flex-col items-start justify-center gap-[0.75rem]">
                <div className="w-[10rem]  leading-[1.625rem] font-medium inline-block">
                  Staking Period
                </div>
                <div className="self-stretch [backdrop-filter:blur(23px)] rounded-3xs bg-slateblue-200 box-border h-[3.75rem] overflow-hidden shrink-0 flex flex-row items-center justify-start py-[0.375rem] px-[1.25rem] text-[1.375rem] border-[1px] border-solid border-darkslateblue">
                  <div className="flex-1 flex flex-row items-center justify-start gap-[0.5rem]">
                    <div className="flex-1  leading-[1.938rem] font-medium">
                      Stake (lock) for 30 days
                    </div>
                    <img
                      className="w-[1.125rem]  h-[1.125rem] overflow-hidden shrink-0"
                      alt=""
                      src="/lichevrondown.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="self-stretch  bg-gainsboro h-[1.875rem]" />
              <div className="[backdrop-filter:blur(23px)] rounded-11xl bg-midnightblue-300 h-[3.25rem] flex flex-row items-center justify-start py-[1rem] px-[1.875rem] box-border gap-[0.625rem] text-right text-c09aff">
                <div className=" leading-[1.625rem] font-medium">
                  Stake until:
                </div>
                <img
                  className="w-[1.125rem]  h-[1.125rem] overflow-hidden shrink-0"
                  alt=""
                  src="/licalendar.svg"
                />
                <div className=" text-[1rem] font-medium text-ffffff">
                  21 Dec 2023 19:15:13
                </div>
              </div>
            </div>
            <img
              className="self-stretch  max-w-full overflow-hidden h-[0rem] shrink-0"
              alt=""
              src="/div1.svg"
            />
            <div className="self-stretch [background:linear-gradient(180deg,_rgba(13,_2,_27,_0.2),_rgba(13,_2,_27,_0))] flex flex-row items-start justify-start p-[2.5rem] gap-[1.875rem] text-right text-[1.375rem] text-gray-100">
              <div className="flex-1 rounded-md bg-fff9 flex flex-row items-center justify-center py-[1rem] px-[2.375rem] gap-[0.625rem]">
                <img
                  className="w-[1.25rem]  h-[1.25rem] overflow-hidden shrink-0"
                  alt=""
                  src="/licoins1.svg"
                />
                <div className=" font-medium">Stake</div>
              </div>
              <div className="flex-1 rounded-md flex flex-row items-center justify-center py-[1rem] px-[2.375rem] text-fff9 border-[1px] border-solid border-fff9">
                <div className=" font-medium">Claim Token Rewards</div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex-1 flex flex-col items-start justify-start text-[1.375rem]">
            <div className="w-[31.875rem] rounded-xl [background:linear-gradient(255.08deg,_#57186d,_#2a0d4e)] box-border flex flex-col items-start justify-start p-[0.062rem] z-[1] border-[1px] border-solid border-mediumpurple">
              <div className="self-stretch rounded-t-lgi rounded-b-none flex flex-row items-center justify-start p-[1.875rem] gap-[0.625rem]">
                <div className="flex-1  leading-[1.875rem] font-medium">
                  Choose Your Staking Rewards:
                </div>
                <div className="flex flex-row items-center justify-start gap-[0.5rem] text-right text-[1rem] text-fff9">
                  <img
                    className="w-[1.125rem]  h-[1.125rem] overflow-hidden shrink-0"
                    alt=""
                    src="/licalculator.svg"
                  />
                  <div className="">ROI Calculator</div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start pt-[0rem] px-[1.25rem] pb-[1.25rem] text-right text-[1.125rem]">
                <div className="flex-1 rounded-3xs bg-gray-700 overflow-hidden flex flex-row items-start justify-start p-[0.062rem] gap-[0.031rem]">
                  <div className="flex-1 [backdrop-filter:blur(23px)] flex flex-col items-start justify-center">
                    <div className="self-stretch bg-gray-400 h-[3.125rem] flex flex-row items-center justify-center p-[1.25rem] box-border text-left text-[0.875rem] text-c09aff">
                      <div className=" font-medium">Duration</div>
                    </div>
                    <div className="self-stretch h-[3.5rem] flex flex-row items-center justify-center py-[0rem] px-[1.25rem] box-border">
                      <div className=" leading-[1.625rem] font-medium">
                        180 days
                      </div>
                    </div>
                    <div className="self-stretch bg-gray-400 h-[3.5rem] flex flex-row items-center justify-center py-[0rem] px-[1.25rem] box-border">
                      <div className=" leading-[1.625rem] font-medium">
                        1 year
                      </div>
                    </div>
                    <div className="self-stretch h-[3.5rem] flex flex-row items-center justify-center py-[0rem] px-[1.25rem] box-border">
                      <div className=" leading-[1.625rem] font-medium">
                        3 years
                      </div>
                    </div>
                    <div className="self-stretch bg-gray-400 h-[3.5rem] flex flex-row items-center justify-center py-[0rem] px-[1.25rem] box-border">
                      <div className=" leading-[1.625rem] font-medium">
                        5 years
                      </div>
                    </div>
                  </div>
                  <img
                    className="self-stretch w-[0.063rem]  max-w-full overflow-hidden max-h-full"
                    alt=""
                    src="/lines1.svg"
                  />
                  <img
                    className="self-stretch w-[0rem]  max-h-full hidden"
                    alt=""
                    src="/div2.svg"
                  />
                  <div className="flex-1 [backdrop-filter:blur(23px)] flex flex-col items-start justify-center">
                    <div className="self-stretch bg-gray-400 h-[3.125rem] flex flex-row items-center justify-center p-[1.25rem] box-border text-left text-[0.875rem] text-c09aff">
                      <div className=" font-medium">NFT</div>
                    </div>
                    <div className="self-stretch h-[3.5rem] flex flex-row items-center justify-center py-[0rem] px-[1.25rem] box-border">
                      <div className=" leading-[1.625rem] font-medium">
                        Item
                      </div>
                    </div>
                    <div className="self-stretch bg-gray-400 h-[3.5rem] flex flex-row items-center justify-center py-[0rem] px-[1.25rem] box-border">
                      <div className=" leading-[1.625rem] font-medium">
                        Character
                      </div>
                    </div>
                    <div className="self-stretch h-[3.5rem] flex flex-row items-center justify-center py-[0rem] px-[1.25rem] box-border">
                      <div className=" leading-[1.625rem] font-medium">
                        Land
                      </div>
                    </div>
                    <div className="self-stretch bg-gray-400 h-[3.5rem] flex flex-row items-center justify-center py-[0rem] px-[1.25rem] box-border">
                      <div className=" leading-[1.625rem] font-medium">
                        Land x 2
                      </div>
                    </div>
                  </div>
                  <img
                    className="self-stretch w-[0.063rem]  max-w-full overflow-hidden max-h-full"
                    alt=""
                    src="/lines2.svg"
                  />
                  <img
                    className="self-stretch w-[0rem]  max-h-full hidden"
                    alt=""
                    src="/div3.svg"
                  />
                  <div className="flex-1 [backdrop-filter:blur(23px)] flex flex-col items-start justify-center">
                    <div className="self-stretch bg-gray-400 h-[3.125rem] flex flex-row items-center justify-center p-[1.25rem] box-border text-left text-[0.875rem] text-c09aff">
                      <div className=" font-medium">MCRT Required</div>
                    </div>
                    <div className="self-stretch h-[3.5rem] flex flex-row items-center justify-center py-[0rem] px-[1.25rem] box-border">
                      <div className=" leading-[1.625rem] font-medium">
                        80.000
                      </div>
                    </div>
                    <div className="self-stretch bg-gray-400 h-[3.5rem] flex flex-row items-center justify-center py-[0rem] px-[1.25rem] box-border">
                      <div className=" leading-[1.625rem] font-medium">
                        160.000
                      </div>
                    </div>
                    <div className="self-stretch h-[3.5rem] flex flex-row items-center justify-center py-[0rem] px-[1.25rem] box-border">
                      <div className=" leading-[1.625rem] font-medium">
                        1.600.000
                      </div>
                    </div>
                    <div className="self-stretch bg-gray-400 h-[3.5rem] flex flex-row items-center justify-center py-[0rem] px-[1.25rem] box-border">
                      <div className=" leading-[1.625rem] font-medium">
                        2.500.000
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch [backdrop-filter:blur(23px)] rounded-xl bg-gray-500 flex flex-row items-start justify-center pt-[3.75rem] px-[2.5rem] pb-[2.5rem] z-[0] mt-[-1.25rem] text-[1rem]">
              <div className="flex-1  font-medium">
                To proceed with using our staking services, please review and
                accept our terms and conditions. By clicking "Stake", you
                confirm that you have read, understood, and agreed to the terms
                and conditions governing the use of our staking services, and
                that you acknowledge the risks associated with staking MCRT
                tokens. Your continued use of our staking services constitutes
                your ongoing acceptance of our terms and conditions.
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default PledgingPage
