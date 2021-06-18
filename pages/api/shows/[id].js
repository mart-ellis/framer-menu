import { shows } from '../../../data/shows';

export default function showHandler(req, res) {
    const filtered = shows.filter((show) => show.id === req.query.id)

    if (filtered.length > 0) {
        res.status(200).json(filtered[0])
    } else {
        res.status(404).json({ message: `Show with id:  ${query.id} not found`})
    }
}