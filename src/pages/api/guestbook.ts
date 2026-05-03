import type { APIRoute } from "astro";
import type { GuestbookResponse } from "../../../netlify/functions/guestbook-read";

const PER_PAGE = 10;

const MOCK_ENTRIES = [
  { name: "Ada Lovelace", location: "London, UK", message: "First programmer ever. Love the retro vibe!", date: "2024-11-10T09:00:00Z" },
  { name: "Linus Torvalds", location: "Helsinki, Finland", message: "Just here to say: I use Linux, btw.", date: "2024-11-09T14:30:00Z" },
  { name: "Grace Hopper", location: "New York, USA", message: "Found a bug... literally. Great site though!", date: "2024-11-08T11:15:00Z" },
  { name: "Tim Berners-Lee", location: "Oxford, UK", message: "You should put this on the World Wide Web.", date: "2024-11-07T16:45:00Z" },
  { name: "Margaret Hamilton", location: "Boston, USA", message: "Software engineering is a real discipline. Prove me wrong.", date: "2024-11-06T10:00:00Z" },
  { name: "Dennis Ritchie", location: "Murray Hill, NJ", message: "C ya later! Great page.", date: "2024-11-05T08:30:00Z" },
  { name: "Bjarne Stroustrup", location: "Aarhus, Denmark", message: "C++ would have been faster but this works.", date: "2024-11-04T13:00:00Z" },
  { name: "Alan Turing", location: "Bletchley, UK", message: "I am not a robot. This is not a test.", date: "2024-11-03T09:45:00Z" },
  { name: "Ken Thompson", location: "San Francisco, USA", message: "Unix vibes in this UI. Respect.", date: "2024-11-02T15:20:00Z" },
  { name: "Guido van Rossum", location: "Amsterdam, Netherlands", message: "Indentation matters. Your CSS is clean.", date: "2024-11-01T12:00:00Z" },
  { name: "Brendan Eich", location: "San Jose, USA", message: "Built JS in 10 days. You clearly took longer. Looks better.", date: "2024-10-31T17:00:00Z" },
  { name: "James Gosling", location: "Calgary, Canada", message: "Write once, sign the guestbook everywhere.", date: "2024-10-30T10:30:00Z" },
];

export const GET: APIRoute = ({ url }) => {
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10));
  const start = (page - 1) * PER_PAGE;
  const slice = MOCK_ENTRIES.slice(start, start + PER_PAGE + 1);

  const result: GuestbookResponse = {
    entries: slice.slice(0, PER_PAGE),
    hasMore: slice.length > PER_PAGE,
  };

  return Response.json(result);
};
