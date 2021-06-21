import tw, { styled } from 'twin.macro'
import Layout from '../components/Layout'
import { shows } from '../data/shows'

const Main = tw.div`flex`

const Title = tw.h1`text-4xl font-semibold max-w-2xl text-center leading-normal text-gray-800`

export default function Home({ shows }) {

  return (
    <Layout shows={shows}>
        <Main>
          <Title>Click on the menu button</Title>
        </Main>
    </Layout>
  )
}
