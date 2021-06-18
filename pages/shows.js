const Shows = ({ data }) => {
    return (
        <div>
            {data.map((show) => (
                <div>
                    <h1>{show.title}</h1>
                </div>
            ))}

            
        </div>
    );
}

export async function getStaticProps(context) {
    const res = await fetch('http://localhost:3000/api/shows');
    const data = await res.json()

    if (!data) {
        return {
            notFound: true
        }
    }

    return {
        props: { data }
    }
} 

export default Shows;
