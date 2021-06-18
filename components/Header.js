import tw, { styled } from 'twin.macro'
import { useRouter } from 'next/router';
import { useEffect } from 'react';


const Header = ({ menuOpen, setMenuOpen }) => {
    const router = useRouter()

    useEffect(() => {
      setMenuOpen(false)
    }, [router]);

    return (
        <StyledHeader>
            <StyledLogoContainer>
            </StyledLogoContainer>

            <StyledHamburger onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            </StyledHamburger>
      </StyledHeader>
    );
}

const StyledHeader = tw.header`pt-8 px-32 absolute top-0 w-full flex justify-between items-center`

const StyledLogoContainer = styled.div({
  ...tw`w-12`,
  '> img': {
    ...tw`max-w-full`
  }
})

const StyledHamburger = styled.div({
  ...tw`w-9 h-5 flex flex-col justify-around items-end`,
  '> span': {
    ...tw`block bg-gray-700 w-full h-1`,
  },
  '> span:nth-child(2)': {
    ...tw`w-4/5`
  }
})

export default Header;
