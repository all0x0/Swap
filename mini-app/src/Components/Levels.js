import { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useUser } from '../context/userContext';

const userLevels = [
  { name: 'Iron', icon: require('../images/iron.png'), tapBalanceRequired: 1000 },
  { name: 'Bronze', icon: require('../images/bronze.png'), tapBalanceRequired: 50000 },
  { name: 'Silver', icon: require('../images/silver.png'), tapBalanceRequired: 500000 },
  { name: 'Gold', icon: require('../images/gold.png'), tapBalanceRequired: 1000000 },
  { name: 'Platinum', icon: require('../images/platinum.png'), tapBalanceRequired: 2500000 },
  { name: 'Diamond', icon: require('../images/diamond.png'), tapBalanceRequired: 5000000 },
  { name: 'Master', icon: require('../images/master.png'), tapBalanceRequired: 10000000 },
  { name: 'Grand Master', icon: require('../images/grandmaster.png'), tapBalanceRequired: 20000000 }, // Grand Master level
  { name: 'Challenger', icon: require('../images/challenger.png'), tapBalanceRequired: 50000000 } // Challenger level
];



const Levels = ({ showLevels, setShowLevels }) => {
  const { tapBalance } = useUser();
  const initialLevelIndex = userLevels.findIndex(level => tapBalance < level.tapBalanceRequired);
  const currentLevelIndex = initialLevelIndex === -1 ? userLevels.length - 1 : initialLevelIndex;

  const [displayedLevelIndex, setDisplayedLevelIndex] = useState(currentLevelIndex);

  const handlePrevious = () => {
    if (displayedLevelIndex > 0) {
      setDisplayedLevelIndex(displayedLevelIndex - 1);
    }
  };

  const handleNext = () => {
    if (displayedLevelIndex < userLevels.length - 1) {
      setDisplayedLevelIndex(displayedLevelIndex + 1);
    }
  };

  const currentLevel = userLevels[displayedLevelIndex];

  const formatNumberCliam = (num) => {
    if (num < 1000) {
      return new Intl.NumberFormat().format(num).replace(/,/g, " ");
    } else if (num < 1000000) { // Less than 1 million
      return (num / 1000).toFixed(1) + "K"; // Show in thousands with "K"
    } else if (num < 1000000000) { // Less than 1 billion
      return (num / 1000000).toFixed(1) + " Million"; // Show in millions
    } else if (num < 1000000000000) { // Less than 1 trillion
      return (num / 1000000000).toFixed(1) + " Billion"; // Show in billions
    } else {
      return (num / 1000000000000).toFixed(1) + " Trillion"; // Show in trillions
    }
  };
  
  useEffect(() => {

    // Attach a click event listener to handle the back navigation
    const handleBackButtonClick = () => {
      setShowLevels(false);
    };


    if (showLevels) {
      window.Telegram.WebApp.BackButton.show();
      window.Telegram.WebApp.BackButton.onClick(handleBackButtonClick);
    } else {
      window.Telegram.WebApp.BackButton.hide();
      window.Telegram.WebApp.BackButton.offClick(handleBackButtonClick);
    }

    // Cleanup handler when component unmounts
    return () => {
      window.Telegram.WebApp.BackButton.offClick(handleBackButtonClick);

    };
  }, [showLevels, setShowLevels]);

  return (
    <>
      {showLevels ? (
        <div className="fixed z-50 left-0 right-0 top-0 bottom-0 flex justify-center taskbg px-[16px] h-full">
          <div className={`w-full flex flex-col items-center justify-start pt-6`}>

            <div className='flex w-full flex-col items-center text-center'>
              <h1 className={`text-[20px] font-semibold`}>
                {currentLevel.name}
              </h1>
              <p className='text-[#9a96a6] text-[14px] font-medium pt-1 pb-10 px-4'>
                Your total balance determines the league you enter:
              </p>
            </div>

            <div className="w-full flex justify-between items-center px-6 relative">

              <div className="flex items-center justify-center absolute left-0">

                {displayedLevelIndex > 0 && (
                  <button className="text-[#e8e8e8] hover:text-[#c4c4c4]" onClick={handlePrevious}>
                    <MdOutlineKeyboardArrowLeft size={40} className='' />
                  </button>
                )}

              </div>
              <div className="flex flex-1 items-center justify-center">



                <img src={currentLevel.icon} alt={currentLevel.name} className="w-[400px] h-auto" />


                {/*  */}

              </div>
              <div className="flex items-center justify-center absolute right-0">
                {displayedLevelIndex < userLevels.length - 1 && (
                  <button className="text-[#e8e8e8] hover:text-[#c4c4c4]" onClick={handleNext}>
                    <MdOutlineKeyboardArrowRight size={40} className='' />
                  </button>
                )} </div>

            </div>
            <div className={`w-full overflow-hidden`}>


              {displayedLevelIndex === currentLevelIndex && displayedLevelIndex < userLevels.length - 1 ? (
                <>
                  <p className="text-[18px] w-full text-center font-semibold text-[#c6c6c6] px-[20px] pt-[35px] pb-[10px]">{tapBalance} / {formatNumberCliam(currentLevel.tapBalanceRequired)}</p>


                  <div className='w-full px-[44px]'>
                    <div className='flex w-full mt-2 p-[4px] items-center bg-energybar rounded-[10px] border-[1px] border-[#403f5c]'>


                      <div className={`h-[8px] rounded-[8px] bg-btn`} style={{ width: `${(tapBalance / currentLevel.tapBalanceRequired) * 100}%` }} />
                    </div>

                  </div>



                </>
              ) : (
                <>

                  <p className="text-[16px] font-medium w-full text-center text-[#c6c6c6] px-[20px] pt-[35px] pb-[10px]">From {formatNumberCliam(currentLevel.tapBalanceRequired)}</p>

                </>
              )}


            </div>


          </div>
        </div>
      ) : null}
    </>
  );
}
export default Levels;
