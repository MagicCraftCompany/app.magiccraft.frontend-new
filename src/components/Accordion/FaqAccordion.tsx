import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

const FaqAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        className="mb-[10px] gap-[30px] rounded-[20px] bg-[#11113A] data-[state=open]:mb-[30px] data-[state=open]:bg-gradient-to-l data-[state=open]:from-[#3D186D] data-[state=open]:to-[#2A0D4E]"
        value="1"
      >
        <AccordionTrigger className="p-[30px] text-left font-serif text-2xl font-bold text-[#C09AFF] data-[state=open]:text-white md:text-3xl">
          WHAT IS MAGICCRAFT?
        </AccordionTrigger>
        <AccordionContent className="px-[30px] pb-[30px] text-lg md:text-2xl">
          MagicCraft is a comprehensive gaming platform that combines an
          action-packed game, a vibrant ecosystem of interconnected titles, and
          an expansive fantasy universe. MagicCraft leads as our flagship PvP
          battle arena title, set within an expansive ecosystem of games, all
          unified in the MagicCraft universe.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        className="mb-[10px] gap-[30px] rounded-[20px] bg-[#11113A] data-[state=open]:mb-[30px] data-[state=open]:bg-gradient-to-l data-[state=open]:from-[#3D186D] data-[state=open]:to-[#2A0D4E]"
        value="2"
      >
        <AccordionTrigger className="p-[30px] text-left font-serif text-2xl font-bold text-[#C09AFF] data-[state=open]:text-white md:text-3xl">
          WHEN WILL THE FULL MAGICCRAFT GAME BE AVAILABLE?
        </AccordionTrigger>
        <AccordionContent className="px-[30px] pb-[30px] text-lg md:text-2xl">
          You can play the MagicCraft game right now! Get started by downloading
          it on iOS, Android, or Steam. New updates are coming to MagicCraft in
          2024, with fresh storyline development, new characters, and maps.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        className="mb-[10px] gap-[30px] rounded-[20px] bg-[#11113A] data-[state=open]:mb-[30px] data-[state=open]:bg-gradient-to-l data-[state=open]:from-[#3D186D] data-[state=open]:to-[#2A0D4E]"
        value="3"
      >
        <AccordionTrigger className="p-[30px] text-left font-serif text-2xl font-bold text-[#C09AFF] data-[state=open]:text-white md:text-3xl">
          HOW DO I GET STARTED WITH MAGICCRAFT?
        </AccordionTrigger>
        <AccordionContent className="px-[30px] pb-[30px] text-lg md:text-2xl">
          You can download and start playing our game at any time. To become a
          part of our Web3 P2E gaming experience, set up your account on the{' '}
          <a
            className="underline"
            target="_blank"
            href="https://lobby.magiccraft.io/"
            rel="noreferrer noopener"
          >
            MagicCraft Lobby System
          </a>{' '}
          and join our{' '}
          <a
            className="underline"
            target="_blank"
            href="https://t.me/magiccraftgamechat"
            rel="noreferrer noopener"
          >
            Telegram
          </a>{' '}
          and{' '}
          <a
            className="underline"
            target="_blank"
            href="https://discord.gg/c4bgnsqzQR"
            rel="noreferrer noopener"
          >
            Discord
          </a>
          .
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        className="mb-[10px] gap-[30px] rounded-[20px] bg-[#11113A] data-[state=open]:mb-[30px] data-[state=open]:bg-gradient-to-l data-[state=open]:from-[#3D186D] data-[state=open]:to-[#2A0D4E]"
        value="4"
      >
        <AccordionTrigger className="p-[30px] text-left font-serif text-2xl font-bold text-[#C09AFF] data-[state=open]:text-white md:text-3xl">
          WHAT PLATFORMS DOES MAGICCRAFT SUPPORT?
        </AccordionTrigger>
        <AccordionContent className="px-[30px] pb-[30px] text-lg md:text-2xl">
          The MagicCraft game supports iOS, Android, and PC. New games in the
          MagicCraft Ecosystem will be mobile-only and will support both iOS and
          Android. <br />
          <br />
          Enjoy a complete Web3 P2E experience by setting up your account on the{' '}
          <a
            className="underline"
            target="_blank"
            href="https://lobby.magiccraft.io/"
            rel="noreferrer noopener"
          >
            MagicCraft Lobby System
          </a>
          .
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default FaqAccordion
