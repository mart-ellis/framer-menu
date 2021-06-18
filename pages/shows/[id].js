import Link from 'next/link'
import tw, { styled } from 'twin.macro';
import Header from '../../components/Header';
import {server} from  '../../serverConfig/index';

const StyledContainer = tw.div`w-screen h-screen flex flex-col justify-center items-center bg-white`

const StyledBackButton = tw.div`absolute top-8 left-16 uppercase font-bold`

const StyledTitle = tw.h1`mt-3 font-semibold text-9xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference text-white z-10 whitespace-nowrap`

const StyledImageContainer = styled.div({
    ...tw`max-w-xl`,
    "> img": {
        ...tw`max-w-full`
    }
})

const Show = ({ show }) => {
    return (
        <StyledContainer>
            <StyledBackButton>
                <Link href="/">
                    <a>Back</a>
                </Link>
            </StyledBackButton>
            <StyledImageContainer>
                <img src={`${show.src}`}></img>
            </StyledImageContainer>
            <StyledTitle>{show.title}</StyledTitle>
        </StyledContainer>
    );
}

export async function getStaticPaths() {
    const res = await fetch(`${server}/api/shows`);
    const shows = await res.json()

    const paths = shows.map(show => ({
        params: { id: show.id }
    }))

    return { paths, fallback: false }
}

export async function getStaticProps(context) {
    console.log(context.params.id);
    const id = context.params.id
    const res = await fetch(`${server}/api/shows/${id}`);
    const show = await res.json()

    return {
        props: { show: show }
    }
}

export default Show;
