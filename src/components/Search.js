import '../assets/css/search.css';

const Search = (props) => {
  return (
    <div className="search">
      <form>
        <input type="text" placeholder="Search" onChange={(event) => props.handleSearch(event)} />
        <input type="submit" value="" className="search-submit" />
      </form>
    </div>
  );
}

export default Search;
