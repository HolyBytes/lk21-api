import axios from 'axios';
import { NextFunction as Next, Request, Response } from 'express';
import { scrapeMovieDetails, scrapeMovies } from '../scrapers/movie';
type TController = (req: Request, res: Response, next?: Next) => Promise<void>;
export const latestMovies: TController = async (req, res) => {
    try {
        const { page = 0 } = req.query;
        const axiosRequest = await axios.get(`${process.env.LK21_URL}/latest${Number(page) > 1 ? `/page/${page}` : ''}`);
        const payload = await scrapeMovies(req, axiosRequest);
        res.status(200).json(payload);
    } catch (err) { console.error(err); res.status(400).json(null); }
};
export const popularMovies: TController = async (req, res) => {
    try {
        const { page = 0 } = req.query;
        const axiosRequest = await axios.get(`${process.env.LK21_URL}/populer${Number(page) > 1 ? `/page/${page}` : ''}`);
        const payload = await scrapeMovies(req, axiosRequest);
        res.status(200).json(payload);
    } catch (err) { console.error(err); res.status(400).json(null); }
};
export const recentReleaseMovies: TController = async (req, res) => {
    try {
        const { page = 0 } = req.query;
        const axiosRequest = await axios.get(`${process.env.LK21_URL}/release${Number(page) > 1 ? `/page/${page}` : ''}`);
        const payload = await scrapeMovies(req, axiosRequest);
        res.status(200).json(payload);
    } catch (err) { console.error(err); res.status(400).json(null); }
};
export const topRatedMovies: TController = async (req, res) => {
    try {
        const { page = 0 } = req.query;
        const axiosRequest = await axios.get(`${process.env.LK21_URL}/rating${Number(page) > 1 ? `/page/${page}` : ''}`);
        const payload = await scrapeMovies(req, axiosRequest);
        res.status(200).json(payload);
    } catch (err) { console.error(err); res.status(400).json(null); }
};
export const movieDetails: TController = async (req, res) => {
    try {
        const { id } = req.params;
        const axiosRequest = await axios.get(`${process.env.LK21_URL}/${id}`);
        const payload = await scrapeMovieDetails(req, axiosRequest);
        res.status(200).json(payload);
    } catch (err) { console.error(err); res.status(400).json(null); }
};
