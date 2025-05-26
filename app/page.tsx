"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  Star,
  Play,
  Search,
  Film,
  TrendingUp,
  Sparkles,
  Settings,
  Share2,
  Trophy,
  Moon,
  Sun,
  Filter,
  Eye,
  Bookmark,
  X,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Clapperboard,
  CheckCircle,
  AlertCircle,
  Menu,
  Shuffle,
  RotateCcw,
  Smile,
  Zap,
  Coffee,
  Brain,
  Laugh,
  Frown,
  HeartIcon,
  Skull,
  Target,
  Globe,
  Award,
  PlayCircle,
  User,
  Linkedin,
} from "lucide-react"

// Comprehensive movie database with more entries
const mockMovies = [
  {
    id: 1,
    title: "Inception",
    genre: "Sci-Fi",
    rating: 8.8,
    year: 2010,
    language: "English",
    industry: "Hollywood",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    trending: true,
    releaseDate: "2010-07-16",
    duration: "148 min",
    mood: ["Thought-provoking", "Suspenseful", "Dark"],
    poster: "/placeholder.svg?height=400&width=300&text=Inception",
    reviews: [
      { user: "MovieBuff2024", rating: 9, comment: "Mind-bending masterpiece!" },
      { user: "CinemaLover", rating: 8, comment: "Complex but rewarding storyline." },
    ],
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: "Action",
    rating: 9.0,
    year: 2008,
    language: "English",
    industry: "Hollywood",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    trending: true,
    releaseDate: "2008-07-18",
    duration: "152 min",
    mood: ["Action-packed", "Dark", "Exciting"],
    poster: "/placeholder.svg?height=400&width=300&text=Dark+Knight",
    reviews: [
      { user: "SuperheroFan", rating: 10, comment: "Heath Ledger's performance is legendary!" },
      { user: "ActionAddict", rating: 9, comment: "Perfect blend of action and drama." },
    ],
  },
  {
    id: 3,
    title: "3 Idiots",
    genre: "Comedy",
    rating: 8.4,
    year: 2009,
    language: "Hindi",
    industry: "Bollywood",
    director: "Rajkumar Hirani",
    cast: ["Aamir Khan", "R. Madhavan", "Sharman Joshi"],
    description:
      "Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.",
    trailer: "https://www.youtube.com/watch?v=K0eDlFX9GMc",
    trending: false,
    releaseDate: "2009-12-25",
    duration: "170 min",
    mood: ["Happy", "Uplifting", "Funny"],
    poster: "/placeholder.svg?height=400&width=300&text=3+Idiots",
    reviews: [
      { user: "BollywoodFan", rating: 9, comment: "Heartwarming and inspiring!" },
      { user: "ComedyLover", rating: 8, comment: "Perfect blend of humor and emotion." },
    ],
  },
  {
    id: 4,
    title: "Parasite",
    genre: "Thriller",
    rating: 8.5,
    year: 2019,
    language: "Korean",
    industry: "Korean Cinema",
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    description:
      "A poor family schemes to become employed by a wealthy family and infiltrate their household by posing as unrelated, highly qualified individuals.",
    trailer: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
    trending: true,
    releaseDate: "2019-05-30",
    duration: "132 min",
    mood: ["Suspenseful", "Dark", "Thought-provoking"],
    poster: "/placeholder.svg?height=400&width=300&text=Parasite",
    reviews: [
      { user: "CinephileKorea", rating: 9, comment: "Masterful social commentary!" },
      { user: "ThrillerFan", rating: 8, comment: "Unpredictable and gripping." },
    ],
  },
  {
    id: 5,
    title: "RRR",
    genre: "Action",
    rating: 7.9,
    year: 2022,
    language: "Telugu",
    industry: "Tollywood",
    director: "S.S. Rajamouli",
    cast: ["N.T. Rama Rao Jr.", "Ram Charan", "Alia Bhatt"],
    description:
      "A fearless revolutionary and an officer in the British force, who once shared a deep bond, decide to join forces and chart out an inspirational path of freedom against the despotic rule.",
    trailer: "https://www.youtube.com/watch?v=f_vbAtFSEc0",
    trending: true,
    releaseDate: "2022-03-25",
    duration: "187 min",
    isNewRelease: true,
    mood: ["Action-packed", "Inspiring", "Exciting"],
    poster: "/placeholder.svg?height=400&width=300&text=RRR",
    reviews: [
      { user: "TollywoodExpert", rating: 8, comment: "Epic storytelling and visuals!" },
      { user: "ActionFanatic", rating: 9, comment: "Spectacular action sequences." },
    ],
  },
  {
    id: 6,
    title: "Amélie",
    genre: "Romance",
    rating: 8.3,
    year: 2001,
    language: "French",
    industry: "French Cinema",
    director: "Jean-Pierre Jeunet",
    cast: ["Audrey Tautou", "Mathieu Kassovitz", "Rufus"],
    description:
      "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.",
    trailer: "https://www.youtube.com/watch?v=MhHuIp5hhKA",
    trending: false,
    releaseDate: "2001-04-25",
    duration: "122 min",
    mood: ["Romantic", "Happy", "Uplifting"],
    poster: "/placeholder.svg?height=400&width=300&text=Amelie",
    reviews: [
      { user: "FrenchCinemaLover", rating: 9, comment: "Whimsical and charming!" },
      { user: "RomanceFan", rating: 8, comment: "Beautiful cinematography and story." },
    ],
  },
  {
    id: 7,
    title: "Your Name",
    genre: "Animation",
    rating: 8.2,
    year: 2016,
    language: "Japanese",
    industry: "Japanese Cinema",
    director: "Makoto Shinkai",
    cast: ["Ryunosuke Kamiki", "Mone Kamishiraishi", "Masami Nagasawa"],
    description:
      "Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things become even more complicated when the boy and girl decide to meet in person.",
    trailer: "https://www.youtube.com/watch?v=xU47nhruN-Q",
    trending: false,
    releaseDate: "2016-08-26",
    duration: "106 min",
    mood: ["Romantic", "Emotional", "Uplifting"],
    poster: "/placeholder.svg?height=400&width=300&text=Your+Name",
    reviews: [
      { user: "AnimeFan", rating: 9, comment: "Stunning animation and emotional story!" },
      { user: "JapaneseCinema", rating: 8, comment: "Beautiful and touching." },
    ],
  },
  {
    id: 8,
    title: "The Godfather",
    genre: "Crime",
    rating: 9.2,
    year: 1972,
    language: "English",
    industry: "Hollywood",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    trailer: "https://www.youtube.com/watch?v=sY1S34973zA",
    trending: false,
    releaseDate: "1972-03-24",
    duration: "175 min",
    mood: ["Dark", "Thought-provoking", "Suspenseful"],
    poster: "/placeholder.svg?height=400&width=300&text=Godfather",
    reviews: [
      { user: "ClassicFilmFan", rating: 10, comment: "The greatest film ever made!" },
      { user: "CrimeDramaLover", rating: 9, comment: "Timeless masterpiece." },
    ],
  },
  {
    id: 9,
    title: "Spirited Away",
    genre: "Animation",
    rating: 9.3,
    year: 2001,
    language: "Japanese",
    industry: "Japanese Cinema",
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
    description:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    trailer: "https://www.youtube.com/watch?v=ByXuk9QqQkk",
    trending: false,
    releaseDate: "2001-07-20",
    duration: "125 min",
    mood: ["Happy", "Uplifting", "Mysterious"],
    poster: "/placeholder.svg?height=400&width=300&text=Spirited+Away",
    reviews: [
      { user: "StudioGhibliFan", rating: 10, comment: "Miyazaki's masterpiece!" },
      { user: "AnimationLover", rating: 9, comment: "Magical and beautiful." },
    ],
  },
  {
    id: 10,
    title: "Dangal",
    genre: "Drama",
    rating: 8.4,
    year: 2016,
    language: "Hindi",
    industry: "Bollywood",
    director: "Nitesh Tiwari",
    cast: ["Aamir Khan", "Fatima Sana Shaikh", "Sanya Malhotra"],
    description:
      "Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.",
    trailer: "https://www.youtube.com/watch?v=x_7YlGv9u1g",
    trending: false,
    releaseDate: "2016-12-23",
    duration: "161 min",
    mood: ["Inspiring", "Uplifting", "Emotional"],
    poster: "/placeholder.svg?height=400&width=300&text=Dangal",
    reviews: [
      { user: "SportsMovieFan", rating: 9, comment: "Inspiring story of determination!" },
      { user: "BollywoodCritic", rating: 8, comment: "Aamir Khan's brilliant performance." },
    ],
  },
  {
    id: 11,
    title: "Oldboy",
    genre: "Thriller",
    rating: 8.4,
    year: 2003,
    language: "Korean",
    industry: "Korean Cinema",
    director: "Park Chan-wook",
    cast: ["Choi Min-sik", "Yoo Ji-tae", "Kang Hye-jung"],
    description:
      "After being kidnapped and imprisoned for fifteen years, Oh Dae-Su is released, only to find that he must find his captor in five days.",
    trailer: "https://www.youtube.com/watch?v=2HkjrJ6IK5E",
    trending: false,
    releaseDate: "2003-11-21",
    duration: "120 min",
    mood: ["Dark", "Suspenseful", "Mysterious"],
    poster: "/placeholder.svg?height=400&width=300&text=Oldboy",
    reviews: [
      { user: "KoreanCinemaExpert", rating: 9, comment: "Intense and unforgettable!" },
      { user: "ThrillerAddict", rating: 8, comment: "Mind-blowing plot twists." },
    ],
  },
  {
    id: 12,
    title: "La La Land",
    genre: "Romance",
    rating: 8.0,
    year: 2016,
    language: "English",
    industry: "Hollywood",
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "John Legend"],
    description:
      "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    trailer: "https://www.youtube.com/watch?v=0pdqf4P9MB8",
    trending: false,
    releaseDate: "2016-12-09",
    duration: "128 min",
    mood: ["Romantic", "Happy", "Uplifting"],
    poster: "/placeholder.svg?height=400&width=300&text=La+La+Land",
    reviews: [
      { user: "MusicalFan", rating: 8, comment: "Beautiful music and cinematography!" },
      { user: "RomanceExpert", rating: 7, comment: "Charming but predictable." },
    ],
  },
  {
    id: 13,
    title: "Avengers: Endgame",
    genre: "Action",
    rating: 8.4,
    year: 2019,
    language: "English",
    industry: "Hollywood",
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    description:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.",
    trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    trending: true,
    releaseDate: "2019-04-26",
    duration: "181 min",
    mood: ["Action-packed", "Exciting", "Emotional"],
    poster: "/placeholder.svg?height=400&width=300&text=Endgame",
    reviews: [
      { user: "MarvelFan", rating: 9, comment: "Epic conclusion to the saga!" },
      { user: "ActionLover", rating: 8, comment: "Satisfying and emotional." },
    ],
  },
  {
    id: 14,
    title: "Baahubali 2",
    genre: "Action",
    rating: 8.2,
    year: 2017,
    language: "Telugu",
    industry: "Tollywood",
    director: "S.S. Rajamouli",
    cast: ["Prabhas", "Rana Daggubati", "Anushka Shetty"],
    description:
      "When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom.",
    trailer: "https://www.youtube.com/watch?v=G62HrubdD6o",
    trending: false,
    releaseDate: "2017-04-28",
    duration: "167 min",
    mood: ["Action-packed", "Epic", "Dramatic"],
    poster: "/placeholder.svg?height=400&width=300&text=Baahubali+2",
    reviews: [
      { user: "EpicMovieFan", rating: 8, comment: "Spectacular visuals and storytelling!" },
      { user: "TollywoodLover", rating: 9, comment: "Rajamouli's masterpiece!" },
    ],
  },
  {
    id: 15,
    title: "Zindagi Na Milegi Dobara",
    genre: "Comedy",
    rating: 8.2,
    year: 2011,
    language: "Hindi",
    industry: "Bollywood",
    director: "Zoya Akhtar",
    cast: ["Hrithik Roshan", "Farhan Akhtar", "Abhay Deol"],
    description:
      "Three friends decide to turn their fantasy vacation into reality after one of their friends gets engaged.",
    trailer: "https://www.youtube.com/watch?v=Uy6Vg8-fiJo",
    trending: false,
    releaseDate: "2011-07-15",
    duration: "155 min",
    mood: ["Happy", "Uplifting", "Adventure"],
    poster: "/placeholder.svg?height=400&width=300&text=ZNMD",
    reviews: [
      { user: "TravelLover", rating: 8, comment: "Perfect blend of friendship and adventure!" },
      { user: "BollywoodFan", rating: 9, comment: "Feel-good movie at its best!" },
    ],
  },
  {
    id: 16,
    title: "Train to Busan",
    genre: "Horror",
    rating: 7.6,
    year: 2016,
    language: "Korean",
    industry: "Korean Cinema",
    director: "Yeon Sang-ho",
    cast: ["Gong Yoo", "Jung Yu-mi", "Ma Dong-seok"],
    description:
      "While a zombie virus breaks out in South Korea, passengers struggle to survive on the train from Seoul to Busan.",
    trailer: "https://www.youtube.com/watch?v=pyWuHv2-Abk",
    trending: false,
    releaseDate: "2016-07-20",
    duration: "118 min",
    mood: ["Suspenseful", "Intense", "Emotional"],
    poster: "/placeholder.svg?height=400&width=300&text=Train+to+Busan",
    reviews: [
      { user: "HorrorFan", rating: 8, comment: "Best zombie movie in years!" },
      { user: "KoreanCinema", rating: 7, comment: "Emotional and thrilling." },
    ],
  },
  {
    id: 17,
    title: "The Pursuit of Happyness",
    genre: "Drama",
    rating: 8.0,
    year: 2006,
    language: "English",
    industry: "Hollywood",
    director: "Gabriele Muccino",
    cast: ["Will Smith", "Jaden Smith", "Thandiwe Newton"],
    description:
      "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career.",
    trailer: "https://www.youtube.com/watch?v=89Kq8SDyvfg",
    trending: false,
    releaseDate: "2006-12-15",
    duration: "117 min",
    mood: ["Inspiring", "Emotional", "Uplifting"],
    poster: "/placeholder.svg?height=400&width=300&text=Pursuit+of+Happyness",
    reviews: [
      { user: "DramaLover", rating: 9, comment: "Will Smith's best performance!" },
      { user: "InspirationalFan", rating: 8, comment: "Truly moving story." },
    ],
  },
  {
    id: 18,
    title: "Coco",
    genre: "Animation",
    rating: 8.4,
    year: 2017,
    language: "English",
    industry: "Hollywood",
    director: "Lee Unkrich",
    cast: ["Anthony Gonzalez", "Gael García Bernal", "Benjamin Bratt"],
    description:
      "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    trailer: "https://www.youtube.com/watch?v=Rvr68u6k5sI",
    trending: false,
    releaseDate: "2017-11-22",
    duration: "105 min",
    mood: ["Happy", "Emotional", "Family-friendly"],
    poster: "/placeholder.svg?height=400&width=300&text=Coco",
    reviews: [
      { user: "PixarFan", rating: 9, comment: "Beautiful story about family and tradition!" },
      { user: "AnimationLover", rating: 8, comment: "Visually stunning and heartwarming." },
    ],
  },
  {
    id: 19,
    title: "Queen",
    genre: "Comedy",
    rating: 8.1,
    year: 2013,
    language: "Hindi",
    industry: "Bollywood",
    director: "Vikas Bahl",
    cast: ["Kangana Ranaut", "Rajkummar Rao", "Lisa Haydon"],
    description:
      "A Delhi girl from a traditional family sets out on a solo honeymoon after her marriage gets cancelled.",
    trailer: "https://www.youtube.com/watch?v=BUWqFOdAHQE",
    trending: false,
    releaseDate: "2013-03-07",
    duration: "146 min",
    mood: ["Happy", "Empowering", "Funny"],
    poster: "/placeholder.svg?height=400&width=300&text=Queen",
    reviews: [
      { user: "WomenEmpowerment", rating: 9, comment: "Kangana's brilliant performance!" },
      { user: "ComedyFan", rating: 8, comment: "Funny and inspiring journey." },
    ],
  },
  {
    id: 20,
    title: "Interstellar",
    genre: "Sci-Fi",
    rating: 8.6,
    year: 2014,
    language: "English",
    industry: "Hollywood",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    trending: true,
    releaseDate: "2014-11-07",
    duration: "169 min",
    mood: ["Thought-provoking", "Emotional", "Epic"],
    poster: "/placeholder.svg?height=400&width=300&text=Interstellar",
    reviews: [
      { user: "SciFiFan", rating: 9, comment: "Nolan's space masterpiece!" },
      { user: "PhysicsLover", rating: 8, comment: "Scientifically fascinating." },
    ],
  },
]

// Mood options with icons and descriptions
const moodOptions = [
  { name: "Happy", icon: Smile, color: "text-yellow-500", description: "Feel-good movies" },
  { name: "Exciting", icon: Zap, color: "text-orange-500", description: "Action-packed adventures" },
  { name: "Relaxing", icon: Coffee, color: "text-green-500", description: "Calm and peaceful" },
  { name: "Thought-provoking", icon: Brain, color: "text-purple-500", description: "Deep and meaningful" },
  { name: "Funny", icon: Laugh, color: "text-pink-500", description: "Comedy and humor" },
  { name: "Romantic", icon: HeartIcon, color: "text-red-500", description: "Love stories" },
  { name: "Dark", icon: Skull, color: "text-gray-500", description: "Intense and serious" },
  { name: "Suspenseful", icon: Target, color: "text-blue-500", description: "Thrilling mysteries" },
  { name: "Inspiring", icon: Award, color: "text-indigo-500", description: "Motivational stories" },
  { name: "Emotional", icon: Frown, color: "text-teal-500", description: "Heart-touching dramas" },
]

// Filter options
const genres = ["Action", "Animation", "Comedy", "Crime", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"]
const languages = ["English", "Hindi", "Korean", "Japanese", "French", "Telugu", "Tamil", "Spanish", "Mandarin"]
const industries = ["Hollywood", "Bollywood", "Tollywood", "Korean Cinema", "Japanese Cinema", "French Cinema"]
const years = Array.from({ length: 30 }, (_, i) => 2024 - i)

// Enhanced user data
const mockUser = {
  id: 1,
  name: "User",
  email: "user@example.com",
  avatar: "/placeholder.svg?height=100&width=100",
  favoriteGenres: ["Sci-Fi", "Action", "Thriller"],
  favoriteLanguages: ["English", "Korean"],
  favoriteIndustries: ["Hollywood", "Korean Cinema"],
  joinDate: "2023-01-15",
  watchedMovies: [1, 2, 3, 8],
  favoriteMovies: [1, 4],
  watchlist: [2, 3, 7],
  userRatings: { 1: 9, 2: 8, 3: 7, 8: 10 },
  stats: { moviesWatched: 127, hoursWatched: 254, favoriteGenre: "Sci-Fi", averageRating: 8.2 },
}

// Enhanced Movie Card Component
const MovieCard = ({
  movie,
  onMovieClick,
  onFavoriteClick,
  onWatchlistClick,
  isFavorite,
  isInWatchlist,
}: {
  movie: (typeof mockMovies)[0]
  onMovieClick: () => void
  onFavoriteClick: () => void
  onWatchlistClick: () => void
  isFavorite: boolean
  isInWatchlist: boolean
}) => {
  const openTrailer = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(movie.trailer, "_blank")
  }

  return (
    <Card className="group relative overflow-hidden bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
      <div className="relative">
        {/* Movie Poster */}
        <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
          <Film className="h-16 w-16 text-gray-400 dark:text-gray-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Movie Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-bold text-lg mb-1 line-clamp-2 drop-shadow-lg">{movie.title}</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="bg-black/50 px-2 py-1 rounded">{movie.year}</span>
              <div className="flex items-center bg-black/50 px-2 py-1 rounded">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{movie.rating}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-gray-900 shadow-lg"
              onClick={onFavoriteClick}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-gray-900 shadow-lg"
              onClick={onWatchlistClick}
            >
              <Bookmark className={`h-4 w-4 ${isInWatchlist ? "fill-blue-500 text-blue-500" : ""}`} />
            </Button>
          </div>

          {/* Trending Badge */}
          {movie.trending && (
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>

        {/* Movie Details */}
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className="text-xs font-medium border-red-200 text-red-600 dark:border-red-800 dark:text-red-400"
            >
              {movie.genre}
            </Badge>
            <Badge
              variant="outline"
              className="text-xs font-medium border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400"
            >
              {movie.industry}
            </Badge>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {movie.language} • {movie.duration}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 leading-relaxed">{movie.description}</p>
          </div>

          <div className="flex space-x-2 pt-2">
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
              onClick={onMovieClick}
            >
              <Eye className="h-4 w-4 mr-2" />
              Details
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
              onClick={openTrailer}
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              Trailer
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default function CineSuggest() {
  // State management
  const [currentUser, setCurrentUser] = useState(mockUser)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedMood, setSelectedMood] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [minRating, setMinRating] = useState("")
  const [filteredMovies, setFilteredMovies] = useState<typeof mockMovies>(mockMovies)
  const [favorites, setFavorites] = useState<number[]>([])
  const [watchlist, setWatchlist] = useState<number[]>([])
  const [watchedMovies, setWatchedMovies] = useState<number[]>([])
  const [userRatings, setUserRatings] = useState<{ [key: number]: number }>({})
  const [selectedMovie, setSelectedMovie] = useState<(typeof mockMovies)[0] | null>(null)
  const [currentView, setCurrentView] = useState("home")
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showAlert, setShowAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeFilters, setActiveFilters] = useState(false)

  // Load saved data from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("cinesuggest-favorites")
    const savedWatchlist = localStorage.getItem("cinesuggest-watchlist")
    const savedWatched = localStorage.getItem("cinesuggest-watched")
    const savedRatings = localStorage.getItem("cinesuggest-ratings")
    const savedDarkMode = localStorage.getItem("cinesuggest-darkmode")

    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist))
    if (savedWatched) setWatchedMovies(JSON.parse(savedWatched))
    if (savedRatings) setUserRatings(JSON.parse(savedRatings))
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode))
  }, [])

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("cinesuggest-favorites", JSON.stringify(favorites))
    localStorage.setItem("cinesuggest-watchlist", JSON.stringify(watchlist))
    localStorage.setItem("cinesuggest-watched", JSON.stringify(watchedMovies))
    localStorage.setItem("cinesuggest-ratings", JSON.stringify(userRatings))
    localStorage.setItem("cinesuggest-darkmode", JSON.stringify(darkMode))
  }, [favorites, watchlist, watchedMovies, userRatings, darkMode])

  // Filter movies based on selected criteria
  useEffect(() => {
    let filtered = [...mockMovies]

    // Text search
    if (searchQuery) {
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.cast.some((actor) => actor.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((movie) => selectedGenres.includes(movie.genre))
    }

    // Language filter
    if (selectedLanguages.length > 0) {
      filtered = filtered.filter((movie) => selectedLanguages.includes(movie.language))
    }

    // Industry filter
    if (selectedIndustries.length > 0) {
      filtered = filtered.filter((movie) => selectedIndustries.includes(movie.industry))
    }

    // Year filter
    if (selectedYear) {
      filtered = filtered.filter((movie) => movie.year.toString() === selectedYear)
    }

    // Rating filter
    if (minRating) {
      filtered = filtered.filter((movie) => movie.rating >= Number.parseFloat(minRating))
    }

    // Mood filter
    if (selectedMood) {
      filtered = filtered.filter((movie) => movie.mood?.includes(selectedMood))
    }

    setFilteredMovies(filtered)
    setActiveFilters(
      searchQuery !== "" ||
        selectedGenres.length > 0 ||
        selectedLanguages.length > 0 ||
        selectedIndustries.length > 0 ||
        selectedYear !== "" ||
        minRating !== "" ||
        selectedMood !== "",
    )
  }, [searchQuery, selectedGenres, selectedLanguages, selectedIndustries, selectedYear, minRating, selectedMood])

  // Show alert helper
  const showAlertMessage = (type: "success" | "error", message: string) => {
    setShowAlert({ type, message })
    setTimeout(() => setShowAlert(null), 3000)
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedGenres([])
    setSelectedLanguages([])
    setSelectedIndustries([])
    setSelectedMood("")
    setSelectedYear("")
    setMinRating("")
    showAlertMessage("success", "All filters cleared!")
  }

  // Toggle functions
  const toggleFavorite = (movieId: number) => {
    const movie = mockMovies.find((m) => m.id === movieId)
    if (favorites.includes(movieId)) {
      setFavorites((prev) => prev.filter((id) => id !== movieId))
      showAlertMessage("success", `Removed ${movie?.title} from favorites`)
    } else {
      setFavorites((prev) => [...prev, movieId])
      showAlertMessage("success", `Added ${movie?.title} to favorites`)
    }
  }

  const toggleWatchlist = (movieId: number) => {
    const movie = mockMovies.find((m) => m.id === movieId)
    if (watchlist.includes(movieId)) {
      setWatchlist((prev) => prev.filter((id) => id !== movieId))
      showAlertMessage("success", `Removed ${movie?.title} from watchlist`)
    } else {
      setWatchlist((prev) => [...prev, movieId])
      showAlertMessage("success", `Added ${movie?.title} to watchlist`)
    }
  }

  // Mood-based filtering
  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    setCurrentView("discover")
    showAlertMessage("success", `Showing ${mood.toLowerCase()} movies!`)
  }

  // Get smart recommendations
  const getSmartRecommendations = () => {
    setIsLoading(true)
    setTimeout(() => {
      let recommendations = [...mockMovies]

      // Remove already watched movies
      recommendations = recommendations.filter((movie) => !watchedMovies.includes(movie.id))

      // Score movies based on user preferences
      const scoredMovies = recommendations.map((movie) => {
        let score = 0
        if (currentUser.favoriteGenres.includes(movie.genre)) score += 3
        if (currentUser.favoriteLanguages.includes(movie.language)) score += 2
        if (currentUser.favoriteIndustries.includes(movie.industry)) score += 2
        if (movie.rating >= 8.5) score += 2
        if (movie.trending) score += 1
        if (movie.year >= 2020) score += 1
        return { ...movie, score }
      })

      // Sort by score and take top recommendations
      const topRecommendations = scoredMovies.sort((a, b) => b.score - a.score).slice(0, 8)
      setFilteredMovies(topRecommendations)
      setCurrentView("discover")
      setIsLoading(false)
      showAlertMessage("success", `Generated ${topRecommendations.length} personalized recommendations!`)
    }, 1000)
  }

  // Computed values
  const trendingMovies = mockMovies.filter((movie) => movie.trending)
  const newReleases = mockMovies.filter((movie) => movie.isNewRelease)

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Alert System */}
      {showAlert && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right">
          <Alert
            className={`shadow-2xl border-2 ${showAlert.type === "success" ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-red-500 bg-red-50 dark:bg-red-950"}`}
          >
            {showAlert.type === "success" ? (
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            )}
            <AlertDescription
              className={`font-medium ${showAlert.type === "success" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}`}
            >
              {showAlert.message}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-md border-b-2 z-40 bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg">
              <Film className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
              CineSuggest
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { key: "home", label: "Home" },
              { key: "discover", label: "Discover" },
              { key: "dashboard", label: "Dashboard" },
              { key: "about", label: "About" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setCurrentView(item.key)}
                className={`font-medium transition-all duration-300 px-3 py-2 rounded-lg ${
                  currentView === item.key
                    ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950"
                    : "text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={getSmartRecommendations}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Get Smart Recommendations"
              disabled={isLoading}
            >
              <Sparkles className="h-5 w-5" />
            </Button>

            <Avatar
              className="h-8 w-8 cursor-pointer border-2 border-gray-200 dark:border-gray-700"
              onClick={() => setCurrentView("dashboard")}
            >
              <AvatarFallback className="bg-gradient-to-r from-red-500 to-purple-600 text-white font-bold">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {["home", "discover", "dashboard", "about"].map((view) => (
                <button
                  key={view}
                  onClick={() => {
                    setCurrentView(view)
                    setMobileMenuOpen(false)
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentView === view
                      ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        {currentView === "home" && (
          <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-red-100/20 via-purple-100/20 to-blue-100/20 dark:from-red-900/20 dark:via-purple-900/20 dark:to-blue-900/20"></div>
              </div>

              <div className="relative z-20 text-center max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-center mb-8 animate-bounce">
                  <div className="p-4 bg-gradient-to-r from-red-500 to-purple-600 rounded-full shadow-2xl">
                    <Sparkles className="h-12 w-12 text-white" />
                  </div>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                  Discover Movies
                </h1>

                <p className="text-2xl md:text-4xl mb-6 text-gray-700 dark:text-gray-300 font-medium">
                  From Every Corner of the World
                </p>

                <p className="text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-600 dark:text-gray-400">
                  Explore movies from Hollywood to Bollywood, Korean Cinema to French Films. Our AI-powered
                  recommendation system helps you discover your next favorite movie across all genres, languages, and
                  industries.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                    onClick={() => setCurrentView("discover")}
                  >
                    <Play className="mr-3 h-6 w-6" />
                    Start Exploring
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="px-12 py-6 text-xl font-bold rounded-full border-3 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 hover:scale-105 transition-all duration-300"
                    onClick={getSmartRecommendations}
                    disabled={isLoading}
                  >
                    <Sparkles className="mr-3 h-6 w-6" />
                    {isLoading ? "Generating..." : "Smart Picks"}
                  </Button>
                </div>
              </div>
            </section>

            {/* Quick Mood Selection */}
            <section className="py-20 bg-white dark:bg-gray-800">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    What's Your Mood?
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Get instant recommendations based on how you're feeling right now
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
                  {moodOptions.map((mood) => (
                    <Card
                      key={mood.name}
                      className="group cursor-pointer border-2 border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-white dark:bg-gray-800"
                      onClick={() => handleMoodSelect(mood.name)}
                    >
                      <CardContent className="p-6 text-center">
                        <div
                          className={`inline-flex p-4 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-red-50 dark:group-hover:bg-red-950 transition-colors duration-300 mb-4`}
                        >
                          <mood.icon
                            className={`h-8 w-8 ${mood.color} group-hover:scale-110 transition-transform duration-300`}
                          />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{mood.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{mood.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Trending Movies */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent flex items-center justify-center">
                    <TrendingUp className="mr-4 h-10 w-10 text-yellow-500" />
                    Trending Worldwide
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    Popular movies from different industries around the globe
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {trendingMovies.slice(0, 8).map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onMovieClick={() => setSelectedMovie(movie)}
                      onFavoriteClick={() => toggleFavorite(movie.id)}
                      onWatchlistClick={() => toggleWatchlist(movie.id)}
                      isFavorite={favorites.includes(movie.id)}
                      isInWatchlist={watchlist.includes(movie.id)}
                    />
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-4 text-lg font-semibold border-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                    onClick={() => setCurrentView("discover")}
                  >
                    <Globe className="mr-2 h-5 w-5" />
                    Explore All Movies
                  </Button>
                </div>
              </div>
            </section>

            {/* Quick Stats */}
            <section className="py-20 bg-white dark:bg-gray-800">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-2 border-red-200 dark:border-red-800">
                    <h3 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-3">{mockMovies.length}+</h3>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">Movies Available</p>
                  </div>
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-2 border-purple-200 dark:border-purple-800">
                    <h3 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-3">
                      {industries.length}+
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">Film Industries</p>
                  </div>
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-2 border-yellow-200 dark:border-yellow-800">
                    <h3 className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-3">
                      {languages.length}+
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">Languages</p>
                  </div>
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-2 border-green-200 dark:border-green-800">
                    <h3 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-3">{genres.length}+</h3>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">Genres</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {currentView === "discover" && (
          <section className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                  Discover Movies
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Use our advanced filters to find exactly what you're looking for
                </p>
              </div>

              {/* Advanced Filters */}
              <Card className="max-w-7xl mx-auto mb-12 border-2 border-gray-200 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-800">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                  <CardTitle className="flex items-center justify-between text-2xl">
                    <div className="flex items-center">
                      <Filter className="mr-3 h-6 w-6 text-red-500" />
                      Advanced Filters
                      {activeFilters && (
                        <Badge className="ml-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
                          {filteredMovies.length} results
                        </Badge>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm" onClick={clearAllFilters} className="border-2">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Clear All
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={getSmartRecommendations}
                        disabled={isLoading}
                        className="border-2"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        Smart Picks
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {/* Search Input */}
                    <div>
                      <label className="block text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                        Search Movies
                      </label>
                      <Input
                        placeholder="Search by title, director, actor..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="text-lg p-4 border-2 border-gray-300 dark:border-gray-600 focus:border-red-500 dark:focus:border-red-500 bg-white dark:bg-gray-700"
                      />
                    </div>

                    {/* Filter Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {/* Genres */}
                      <div>
                        <label className="block text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                          Genres ({selectedGenres.length} selected)
                        </label>
                        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                          {genres.map((genre) => (
                            <Badge
                              key={genre}
                              variant={selectedGenres.includes(genre) ? "default" : "outline"}
                              className={`cursor-pointer hover:scale-105 transition-transform text-sm py-2 px-3 ${
                                selectedGenres.includes(genre)
                                  ? "bg-red-500 text-white border-red-500"
                                  : "border-gray-300 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-600"
                              }`}
                              onClick={() => {
                                setSelectedGenres((prev) =>
                                  prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
                                )
                              }}
                            >
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Languages */}
                      <div>
                        <label className="block text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                          Languages ({selectedLanguages.length} selected)
                        </label>
                        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                          {languages.map((language) => (
                            <Badge
                              key={language}
                              variant={selectedLanguages.includes(language) ? "default" : "outline"}
                              className={`cursor-pointer hover:scale-105 transition-transform text-sm py-2 px-3 ${
                                selectedLanguages.includes(language)
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
                              }`}
                              onClick={() => {
                                setSelectedLanguages((prev) =>
                                  prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language],
                                )
                              }}
                            >
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Industries */}
                      <div>
                        <label className="block text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                          Industries ({selectedIndustries.length} selected)
                        </label>
                        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                          {industries.map((industry) => (
                            <Badge
                              key={industry}
                              variant={selectedIndustries.includes(industry) ? "default" : "outline"}
                              className={`cursor-pointer hover:scale-105 transition-transform text-sm py-2 px-3 ${
                                selectedIndustries.includes(industry)
                                  ? "bg-purple-500 text-white border-purple-500"
                                  : "border-gray-300 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600"
                              }`}
                              onClick={() => {
                                setSelectedIndustries((prev) =>
                                  prev.includes(industry) ? prev.filter((i) => i !== industry) : [...prev, industry],
                                )
                              }}
                            >
                              {industry}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Year Filter */}
                      <div>
                        <label className="block text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                          Release Year
                        </label>
                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                          <SelectTrigger className="text-lg p-4 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                            <SelectValue placeholder="Any year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Rating Filter */}
                      <div>
                        <label className="block text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                          Minimum Rating
                        </label>
                        <Select value={minRating} onValueChange={setMinRating}>
                          <SelectTrigger className="text-lg p-4 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                            <SelectValue placeholder="Any rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7.0+ ⭐</SelectItem>
                            <SelectItem value="8">8.0+ ⭐⭐</SelectItem>
                            <SelectItem value="9">9.0+ ⭐⭐⭐</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Mood Filter */}
                      <div>
                        <label className="block text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                          Current Mood
                        </label>
                        <Select value={selectedMood} onValueChange={setSelectedMood}>
                          <SelectTrigger className="text-lg p-4 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                            <SelectValue placeholder="Select your mood" />
                          </SelectTrigger>
                          <SelectContent>
                            {moodOptions.map((mood) => (
                              <SelectItem key={mood.name} value={mood.name}>
                                <div className="flex items-center">
                                  <mood.icon className={`h-4 w-4 mr-2 ${mood.color}`} />
                                  {mood.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {activeFilters ? `Found ${filteredMovies.length} movies` : `All Movies (${filteredMovies.length})`}
                  </h3>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const randomMovie = filteredMovies[Math.floor(Math.random() * filteredMovies.length)]
                        if (randomMovie) setSelectedMovie(randomMovie)
                      }}
                      className="border-2"
                    >
                      <Shuffle className="mr-2 h-4 w-4" />
                      Random Pick
                    </Button>
                  </div>
                </div>

                {filteredMovies.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredMovies.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={() => setSelectedMovie(movie)}
                        onFavoriteClick={() => toggleFavorite(movie.id)}
                        onWatchlistClick={() => toggleWatchlist(movie.id)}
                        isFavorite={favorites.includes(movie.id)}
                        isInWatchlist={watchlist.includes(movie.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 max-w-md mx-auto">
                      <Film className="h-20 w-20 mx-auto mb-6 text-gray-400" />
                      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">No movies found</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Try adjusting your filters or search terms to find more movies
                      </p>
                      <Button variant="outline" onClick={clearAllFilters} className="border-2">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Clear All Filters
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {currentView === "dashboard" && (
          <section className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4">
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to Your Dashboard!
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">Here's your personalized movie dashboard</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* User Stats */}
                <div className="lg:col-span-2 space-y-8">
                  <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-800">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <CardTitle className="flex items-center justify-between text-2xl">
                        <div className="flex items-center">
                          <Trophy className="mr-3 h-6 w-6 text-yellow-500" />
                          Your Movie Stats
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={getSmartRecommendations}
                          disabled={isLoading}
                          className="border-2"
                        >
                          <Sparkles className="mr-2 h-4 w-4" />
                          {isLoading ? "Loading..." : "Get Recommendations"}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between mb-3">
                              <span className="font-semibold text-gray-900 dark:text-white">Movies Watched</span>
                              <span className="font-bold text-red-600 dark:text-red-400">{watchedMovies.length}</span>
                            </div>
                            <Progress value={(watchedMovies.length / mockMovies.length) * 100} className="h-3" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-3">
                              <span className="font-semibold text-gray-900 dark:text-white">Favorites</span>
                              <span className="font-bold text-purple-600 dark:text-purple-400">{favorites.length}</span>
                            </div>
                            <Progress value={(favorites.length / mockMovies.length) * 100} className="h-3" />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-xl border-2 border-red-200 dark:border-red-800">
                            <span className="text-sm font-medium text-red-700 dark:text-red-300">Favorite Genre</span>
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400">Sci-Fi</p>
                          </div>
                          <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
                            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                              Average Rating
                            </span>
                            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">8.2/10</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="text-2xl">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentView("discover")}
                          className="h-24 flex-col border-2 hover:border-red-300 dark:hover:border-red-600"
                        >
                          <Search className="h-8 w-8 mb-2 text-red-500" />
                          <span className="font-semibold">Discover</span>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            const randomMovie = mockMovies[Math.floor(Math.random() * mockMovies.length)]
                            setSelectedMovie(randomMovie)
                          }}
                          className="h-24 flex-col border-2 hover:border-purple-300 dark:hover:border-purple-600"
                        >
                          <Shuffle className="h-8 w-8 mb-2 text-purple-500" />
                          <span className="font-semibold">Random</span>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleMoodSelect("Happy")}
                          className="h-24 flex-col border-2 hover:border-yellow-300 dark:hover:border-yellow-600"
                        >
                          <Smile className="h-8 w-8 mb-2 text-yellow-500" />
                          <span className="font-semibold">Feel Good</span>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() =>
                            showAlertMessage("success", `You have ${watchlist.length} movies in your watchlist`)
                          }
                          className="h-24 flex-col border-2 hover:border-blue-300 dark:hover:border-blue-600"
                        >
                          <Bookmark className="h-8 w-8 mb-2 text-blue-500" />
                          <span className="font-semibold">Watchlist</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Profile & Lists */}
                <div className="space-y-8">
                  <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="text-2xl">Your Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 text-center">
                      <Avatar className="h-24 w-24 mx-auto mb-6 border-4 border-red-200 dark:border-red-800">
                        <AvatarFallback className="bg-gradient-to-r from-red-500 to-purple-600 text-white text-2xl font-bold">
                          <User className="h-12 w-12" />
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-white">Joined User</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">Member since: Joined User</p>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full border-2">
                          <Settings className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-2"
                          onClick={() =>
                            showAlertMessage("success", `You have ${watchlist.length} movies in your watchlist`)
                          }
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Your Watchlist ({watchlist.length})
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-2"
                          onClick={() => showAlertMessage("success", `You have ${favorites.length} favorite movies`)}
                        >
                          <Heart className="mr-2 h-4 w-4" />
                          Favorites ({favorites.length})
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Personalized Recommendations */}
                  <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl">
                        <Sparkles className="mr-3 h-6 w-6 text-purple-500" />
                        For You
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Based on your preferences: {currentUser.favoriteGenres.join(", ")}
                      </p>
                      <div className="space-y-4">
                        {mockMovies
                          .filter(
                            (movie) =>
                              currentUser.favoriteGenres.includes(movie.genre) && !watchedMovies.includes(movie.id),
                          )
                          .slice(0, 3)
                          .map((movie) => (
                            <div
                              key={movie.id}
                              className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded-lg transition-colors border-2 border-transparent hover:border-red-200 dark:hover:border-red-800"
                              onClick={() => setSelectedMovie(movie)}
                            >
                              <div className="w-12 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                                <Clapperboard className="h-6 w-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-900 dark:text-white">{movie.title}</h4>
                                <div className="flex items-center mt-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                  <span className="text-sm font-medium">{movie.rating}</span>
                                  <span className="text-sm text-gray-500 ml-2">{movie.industry}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-6 border-2"
                        onClick={getSmartRecommendations}
                        disabled={isLoading}
                      >
                        {isLoading ? "Loading..." : "Get More Recommendations"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        )}

        {currentView === "about" && (
          <section className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-20">
                <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                  About CineSuggest
                </h1>
                <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Connecting movie lovers with cinema from around the world
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-16 mb-20">
                <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-800">
                  <CardContent className="p-10">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
                    <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
                      At CineSuggest, we believe great stories transcend borders. Our platform helps you discover
                      incredible movies from Hollywood to Bollywood, Korean cinema to French films, and everything in
                      between.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      We're passionate about breaking down language and cultural barriers to help you find your next
                      favorite film, regardless of where it was made.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-800">
                  <CardContent className="p-10">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Global Cinema</h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="text-lg text-gray-700 dark:text-gray-300">
                          {industries.length}+ Film Industries Worldwide
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                        <span className="text-lg text-gray-700 dark:text-gray-300">
                          {languages.length}+ Languages Supported
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-lg text-gray-700 dark:text-gray-300">{genres.length}+ Movie Genres</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-lg text-gray-700 dark:text-gray-300">AI-Powered Recommendations</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="text-lg text-gray-700 dark:text-gray-300">Cultural Context & Reviews</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Section */}
              <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-800 mb-16">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                  <CardTitle className="text-3xl text-center">Contact</CardTitle>
                </CardHeader>
                <CardContent className="p-10">
                  <div className="max-w-md mx-auto text-center space-y-6">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                        <Mail className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</p>
                        <a
                          href="mailto:kushagra.22bce8467@vitapstudent.ac.in"
                          className="text-lg text-red-600 dark:text-red-400 hover:underline"
                        >
                          kushagra.22bce8467@vitapstudent.ac.in
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Linkedin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">LinkedIn</p>
                        <a
                          href="https://www.linkedin.com/in/kushagra2713/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          linkedin.com/in/kushagra2713
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Creator Credit */}
              <div className="text-center">
                <Card className="inline-block border-2 border-gray-200 dark:border-gray-700 shadow-xl bg-gradient-to-r from-red-50 to-purple-50 dark:from-red-950 dark:to-purple-950">
                  <CardContent className="p-10">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Made with ❤️ by</h3>
                    <p className="text-4xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                      Kushagra Sharma
                    </p>
                    <p className="text-lg mt-3 text-gray-600 dark:text-gray-400">
                      Full Stack Developer & Global Cinema Enthusiast
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <Dialog open={!!selectedMovie} onOpenChange={() => setSelectedMovie(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between text-2xl">
                <span className="text-gray-900 dark:text-white">{selectedMovie.title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMovie(null)}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-8 p-6">
              <div>
                {/* Movie Poster */}
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center mb-6 border-2 border-gray-200 dark:border-gray-700">
                  <Film className="h-24 w-24 text-gray-400 dark:text-gray-500" />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Button
                    onClick={() => toggleFavorite(selectedMovie.id)}
                    variant={favorites.includes(selectedMovie.id) ? "default" : "outline"}
                    className="border-2"
                  >
                    <Heart className={`mr-2 h-4 w-4 ${favorites.includes(selectedMovie.id) ? "fill-current" : ""}`} />
                    {favorites.includes(selectedMovie.id) ? "Favorited" : "Add to Favorites"}
                  </Button>
                  <Button
                    onClick={() => toggleWatchlist(selectedMovie.id)}
                    variant={watchlist.includes(selectedMovie.id) ? "default" : "outline"}
                    className="border-2"
                  >
                    <Bookmark
                      className={`mr-2 h-4 w-4 ${watchlist.includes(selectedMovie.id) ? "fill-current" : ""}`}
                    />
                    {watchlist.includes(selectedMovie.id) ? "In Watchlist" : "Add to Watchlist"}
                  </Button>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white mb-6"
                  onClick={() => window.open(selectedMovie.trailer, "_blank")}
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Trailer
                </Button>

                {/* Share Buttons */}
                <div>
                  <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Share this movie</h4>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" className="border-2">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-2">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-2">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Movie Info */}
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700 text-sm py-1 px-3">
                      {selectedMovie.genre}
                    </Badge>
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700 text-sm py-1 px-3">
                      {selectedMovie.industry}
                    </Badge>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-5 w-5 fill-current mr-1" />
                      <span className="font-bold text-lg">{selectedMovie.rating}/10</span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
                    {selectedMovie.year} • {selectedMovie.duration} • {selectedMovie.language}
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                    {selectedMovie.description}
                  </p>

                  <div className="space-y-3 text-lg">
                    <p className="text-gray-900 dark:text-white">
                      <strong>Director:</strong> {selectedMovie.director}
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      <strong>Cast:</strong> {selectedMovie.cast.join(", ")}
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      <strong>Industry:</strong> {selectedMovie.industry}
                    </p>
                    {selectedMovie.mood && (
                      <p className="text-gray-900 dark:text-white">
                        <strong>Mood:</strong> {selectedMovie.mood.join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                {/* User Reviews */}
                <div>
                  <h4 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">User Reviews</h4>
                  <div className="space-y-4 max-h-48 overflow-y-auto">
                    {selectedMovie.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-gray-900 dark:text-white">{review.user}</span>
                          <div className="flex items-center text-yellow-500">
                            <Star className="h-4 w-4 fill-current mr-1" />
                            <span className="font-medium">{review.rating}/10</span>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Movies */}
                <div>
                  <h4 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">You might also like</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {mockMovies
                      .filter(
                        (movie) =>
                          (movie.genre === selectedMovie.genre || movie.industry === selectedMovie.industry) &&
                          movie.id !== selectedMovie.id &&
                          !watchedMovies.includes(movie.id),
                      )
                      .slice(0, 3)
                      .map((movie) => (
                        <div
                          key={movie.id}
                          className="cursor-pointer hover:scale-105 transition-transform border-2 border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:border-red-300 dark:hover:border-red-600"
                          onClick={() => setSelectedMovie(movie)}
                        >
                          <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center mb-2">
                            <Film className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                          </div>
                          <p className="text-sm font-bold text-center text-gray-900 dark:text-white">{movie.title}</p>
                          <div className="flex items-center justify-center mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-xs font-medium">{movie.rating}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Footer */}
      <footer className="border-t-2 border-gray-200 dark:border-gray-800 py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg">
                  <Film className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                  CineSuggest
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Discover movies from around the world with personalized AI-powered recommendations.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2"
                  onClick={() => showAlertMessage("success", "Opening Facebook page...")}
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2"
                  onClick={() => showAlertMessage("success", "Opening Twitter page...")}
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2"
                  onClick={() => showAlertMessage("success", "Opening Instagram page...")}
                >
                  <Instagram className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">Features</h4>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li>
                  <button onClick={() => setCurrentView("discover")} className="hover:text-red-500 transition-colors">
                    Global Movie Discovery
                  </button>
                </li>
                <li>
                  <button onClick={getSmartRecommendations} className="hover:text-red-500 transition-colors">
                    AI Recommendations
                  </button>
                </li>
                <li>
                  <button onClick={() => handleMoodSelect("Happy")} className="hover:text-red-500 transition-colors">
                    Mood-based Filtering
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView("dashboard")} className="hover:text-red-500 transition-colors">
                    Personal Dashboard
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">Explore</h4>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li>
                  <button
                    onClick={() => {
                      setSelectedIndustries(["Hollywood"])
                      setCurrentView("discover")
                    }}
                    className="hover:text-red-500 transition-colors"
                  >
                    Hollywood Movies
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedIndustries(["Bollywood"])
                      setCurrentView("discover")
                    }}
                    className="hover:text-red-500 transition-colors"
                  >
                    Bollywood Films
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedIndustries(["Korean Cinema"])
                      setCurrentView("discover")
                    }}
                    className="hover:text-red-500 transition-colors"
                  >
                    Korean Cinema
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedGenres(["Animation"])
                      setCurrentView("discover")
                    }}
                    className="hover:text-red-500 transition-colors"
                  >
                    Animation
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">Support</h4>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li>
                  <button
                    onClick={() => showAlertMessage("success", "Opening help center...")}
                    className="hover:text-red-500 transition-colors"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => showAlertMessage("success", "Opening FAQ page...")}
                    className="hover:text-red-500 transition-colors"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView("about")} className="hover:text-red-500 transition-colors">
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => showAlertMessage("success", "Thanks for your feedback!")}
                    className="hover:text-red-500 transition-colors"
                  >
                    Send Feedback
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-12" />

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">© 2024 CineSuggest. All rights reserved.</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
              Made with ❤️ by Kushagra Sharma
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
