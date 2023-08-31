import qs from "qs";
import { useEffect, useState } from "react";
import "./App.css";
import { Pagination } from "./components/Pagination";
import SearchInput from "./components/SearchInput";
import "./styles.css";

const api = "https://kitsu.io/api/edge/";

const LIMIT = 10;

interface ApiData {
  data: {
    id: string;
    attributes: {
      canonicalTitle: string;
      posterImage: {
        small: string;
      };
    };
  }[];
  meta: {
    count: number;
  };
}

export default function App() {
  const [info, setInfo] = useState<ApiData>();
  const [text, setText] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setInfo({} as ApiData);

    const query = {
      page: {
        limit: LIMIT,
        offset,
      },
      filter: {
        text: "",
      },
    };

    if (text) {
      query.filter = {
        text,
      };
    }

    fetch(`${api}anime?${qs.stringify(query)}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setInfo(response);
      });
  }, [text, offset]);

  return (
    <div className="App">
      <h1>Cartoons</h1>
      <SearchInput value={text} onChange={(search) => setText(search)} />
      {info && info.data && (
        <ul className="animes-list">
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img
                src={anime.attributes.posterImage.small}
                alt={anime.attributes.canonicalTitle}
              />
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}
      {info?.meta && (
        <Pagination
          limit={LIMIT}
          total={info.meta.count}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  );
}
