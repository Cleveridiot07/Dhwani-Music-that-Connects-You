import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input.js";
import { SearchIcon, Loader2 } from "lucide-react";
import axios from "axios";
import { debounce } from "lodash";
import { Song } from "@/types";
import PlayButton from "@/pages/home/components/PlayButton.js";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch search results from backend
  const fetchSongs = async (searchTerm: string) => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/songs/search?query=${searchTerm}`
      );
      console.log("Response", response.data);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce function to reduce API calls
  const debouncedFetchSongs = debounce(fetchSongs, 500);

  // Trigger search when query changes
  useEffect(() => {
    debouncedFetchSongs(query);
    return () => debouncedFetchSongs.cancel();
  }, [query]);

  return (
    <div className="relative">
      <div className="flex items-center bg-zinc-800 rounded-md px-3 py-2">
        <SearchIcon className="size-5 text-zinc-400 mr-2" />
        <Input
          type="text"
          placeholder="Search songs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-white border-none focus:outline-none w-48 sm:w-64"
        />
      </div>

      {/* Dropdown for search results */}
      {query && (
        <div className="absolute left-0 mt-2 w-64 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-2">
              <Loader2 className="size-5 animate-spin text-white" />
            </div>
          ) : results.length > 0 ? (
            results.map((song) => (
              <div
                key={song._id}
                className="group flex h-16 items-center justify-between px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 transition-all cursor-pointer relative"
              >
                <div className="flex gap-2 items-center">
                  <img
                    src={song.imageUrl}
                    alt="./DhwaniLogo.png"
                    className="w-8 h-8 rounded-md"
                  />
                  <span>{song.title}</span>
                </div>
                <div className="h-16 flex items-center justify-center">
                  <PlayButton song={song} />
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-zinc-400">
              No songs found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
