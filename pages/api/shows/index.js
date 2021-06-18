import { shows } from '../../../data/shows';

export default function handle(req, res) {
    res.status(200).json(shows)
}