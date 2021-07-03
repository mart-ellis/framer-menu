import Link from 'next/link'
import styled from 'styled-components';
import tw from "twin.macro";
import { motion, AnimatePresence, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { list } from 'postcss';


const Container = tw.div`w-screen h-screen min-h-screen min-w-full fixed z-20`
const StyledMenuContainer = tw(motion.div)`w-screen max-w-full min-h-screen bg-white flex items-center justify-center z-50 absolute`
const StyledCloseIcon = tw.div`absolute top-11 right-32 uppercase font-bold text-gray-800` 
const StyledMenu = tw(motion.ul)`w-3/5`
const StyledMenuItem = tw(motion.li)`my-5`
const StyledMenuItemInner = tw.div`relative my-1 pt-10 pb-2 flex w-full items-baseline`
const StyledStartLine = styled.div({
    ...tw`h-0.5 border-b-2 border-gray-800 relative`,
})
const StyledLineMask = styled(motion.div)(({ isRight }) => [
    tw`bg-indigo-500 h-full border border-white absolute z-50`,
    isRight && tw`right-0`
])
const StyledTitleContainer = tw(motion.div)`whitespace-nowrap`
const StyledTitle = styled(motion.h2)({
    ...tw`font-bold text-5xl px-1 leading-snug overflow-hidden text-gray-800`,
    '&:hover': {
        '-webkit-text-fill-color': 'white',
        '-webkit-text-stroke-width': '1px',
        '-webkit-text-stroke-color': 'black',
    }
})
const StyledEndLine = styled.div({
    ...tw`h-0.5 border-b-2 border-gray-800 relative`,
})
const StyledImageContainer = styled.div({
    ...tw`w-32 h-auto bg-indigo-500 overflow-hidden object-cover absolute flex items-center justify-center top-3`,
    '> img': {
        'width': '100%'
    }
})
const StyledImageMask = tw(motion.div)`bg-white w-full h-full absolute top-0 left-0`
const StyledFloatingImageContainer = styled(motion.div)({
    ...tw`w-96 pointer-events-none absolute z-50`,
    '> img': {
        'width': '100%'
    }
})

// Default Transition //
const transition = {
    duration: 0.8,
    ease: [0.6,-0.5,0.01,0.9]
}

// Framer Motion Variants //

const parent = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 1,
        }
    }
}

const titleSlideUp = {
    initial: {
        y: 200
    },
    animate: {
        y: 0
    }
}

const maskReveal = {
    initial: {
        width: "100%"
    },
    animate: {
        width: 0
    }
}


const Menu = ({ shows, menuOpen, setMenuOpen, x, y }) => {

    return (

        <AnimatePresence>
            {menuOpen && (
                <Container>
                    <StyledMenuContainer 
                        initial={{ visibility: 'hidden' }}
                        animate={{ visibility: 'visible', transition: { delay: 1} }}
                        exit={{ visibility: 'hidden', transition: { delay: 1} }}
                    >
                        <StyledCloseIcon onClick={() => setMenuOpen(!menuOpen)}>
                            <p>Close</p>
                        </StyledCloseIcon>
                        <StyledMenu
                            variants={parent}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            {shows.map((show) => {
                                let list = useRef()
                                const [listItemHover, setListItemHover] = useState(false)
                                const [listPosition, setListPosition] = useState({
                                    top: 0,
                                    left: 0
                                })

                                useEffect(() => {
                                    setListPosition({
                                        top: list.current.getBoundingClientRect().top,
                                        left: list.current.getBoundingClientRect().left
                                    })
                                }, [listItemHover])
                                
                                
                                return (
                                <StyledMenuItem
                                    ref={list}

                                >
                                    <Link href={`/shows/${show.id}`} >
                                        <StyledMenuItemInner>
                                            <StyledStartLine css={{ flex: `${show.leftLineFlex}`}} >
                                                <StyledLineMask 
                                                    variants={maskReveal} 
                                                    transition={{...transition, duration: 1}} 
                                                />
                                            </StyledStartLine>
                                            <StyledTitleContainer 
                                                onHoverStart={() => setListItemHover(true)}
                                                onHoverEnd={() => setListItemHover(false)}
                                            >
                                                <StyledTitle>
                                                    <motion.div variants={titleSlideUp} transition={transition}>
                                                        {show.title}
                                                    </motion.div>
                                                </StyledTitle>
                                            </StyledTitleContainer>
                                            <StyledEndLine css={{ flex: `${show.rightLineFlex}`}}>
                                                <StyledLineMask 
                                                        variants={maskReveal} 
                                                        transition={{...transition, duration: 1}} 
                                                        isRight
                                                />
                                            </StyledEndLine>
                                            <StyledImageContainer css={{ left: `${show.thumbnailPosition}`}}>
                                                <StyledImageMask
                                                    variants={maskReveal}
                                                    transition={transition}
                                                />
                                                <img src={`${show.src}`} />
                                            </StyledImageContainer>
                                            <StyledFloatingImageContainer
                                                initial={{opacity: 0}}
                                                animate={{ 
                                                    opacity: listItemHover ? 1 : 0,
                                                    x: x - listPosition.left + show.offset,
                                                    y: y - listPosition.top - 150
                                                }}
                                                transition={{
                                                    ease: 'linear'
                                                }}
                                            >
                                                <img src={`${show.src}`} />
                                            </StyledFloatingImageContainer>
                                        </StyledMenuItemInner>
                                    </Link>
                                </StyledMenuItem>
                            )})}
                        </StyledMenu>
                    </StyledMenuContainer>
                    <Panels />
                </Container>
            )}
        </AnimatePresence>
    );
}

const StyledLeftPanel = tw(motion.div)`absolute h-screen z-50 left-0`
const StyledRightPanel = tw(motion.div)`absolute h-screen z-50 right-0`

const Panels = () => {
    const [panelComplete, setPanelComplete]  = useState(false)

    return (
        <> 
            <StyledLeftPanel 
                style={{ minWidth: '50vw', background: panelComplete ? '#ff5959' : '#facf5a' }} 
                initial={{ height: 0 }}
                animate={{ 
                    height: [0, window.innerHeight, 0],
                    bottom: [0, 0, window.innerHeight],
                }}
                exit={{ 
                    height: [0, window.innerHeight, 0],
                    top: [0, 0, window.innerHeight],
                }}
                transition={{...transition, duration: 2, times: [0, .5, 1]}} 
            />
            <StyledRightPanel style={{ minWidth: '50vw' }} 
                style={{ minWidth: '50vw', background: panelComplete ? '#ff5959' : '#facf5a' }} 
                initial={{ height: 0 }}
                animate={{ 
                    height: [0, window.innerHeight, 0],
                    bottom: [window.innerHeight, 0, 0],
                }}
                exit={{ 
                    height: [0, window.innerHeight, 0],
                    bottom: [0, 0, window.innerHeight],
                }}
                transition={{...transition, duration: 2, times: [0, .5, 1]}} 
                onAnimationComplete={() => {
                    setPanelComplete(!panelComplete)
                }}
            />
        </>
    )
}

export default Menu;