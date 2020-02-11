import React, { Component } from "react";
import firebase from "./../firebase/config";
import "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import RecipeCard from "./RecipeCard";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  connectHits,
  RefinementList
} from "react-instantsearch-dom";
import { CustomSearchBox } from "./FeedSearch";

// var db = firebase.firestore();

const searchClient = algoliasearch(
  "471N5SCCV8",
  "3b9d814b0c08445b640fd407b8dbae54"
);

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [], loading: false };
  }

  // getAllRecipes = async () => {
  //   const snapshot = await db.collection("Recipes").get();
  //   const allRecipes = [];
  //   snapshot.forEach(doc => (allRecipes[doc.id] = doc.data()));
  //   this.setState({ recipes: allRecipes });
  // };

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   db.collection("Recipes").onSnapshot(snapshot => {
  //     let recipes = [];
  //     snapshot.forEach(doc => recipes.push({ ...doc.data(), uid: doc.id }));
  //     this.setState({
  //       recipes,
  //       loading: false
  //     });
  //   });
  // }

  render() {
    return (
      <>
        {/* <div className="container"> */}

        {console.log(this.props.hits)}
        {!this.state.loading && this.props.hits.length > 0 ? (
          this.props.hits.map((hit, index) => (
            <div className="w-75 m-auto" key={hit.objectID}>
              <RecipeCard
                index={index}
                id={hit.objectID}
                title={hit.title}
                flags={hit.flags}
                name={hit.user_name}
                duration={hit.duration}
                imageUrl={hit.imageUrl}
                difficulty={hit.difficulty}
                description={hit.description}
              />
            </div>
          ))
        ) : (
          <div>
            <ClipLoader
              css={`
                display: block;
                margin: 0 auto;
              `}
              size={150}
              color={"#333"}
              loading={this.state.loading}
            />
          </div>
        )}
        {/* </div> */}
      </>
    );
  }
}

const CustomHits = connectHits(Feed);

function Search() {
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="Recipes">
        <div className="container">
          <h1 className="headline-feed">
            <span className="underline--magical">Feed</span>
          </h1>
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8 card-container mb-5">
              <CustomSearchBox />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2">
              <h4>Flags</h4>
              <RefinementList attribute="flags" operator="and" />
            </div>
            <div className="col-sm-10">
              <CustomHits />
            </div>
          </div>
        </div>
      </InstantSearch>
    </>
  );
}

export default Search;
