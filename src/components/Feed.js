import React, { Component } from "react";
import firebase from "./../firebase/config";
import "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import RecipeCard from "./RecipeCard";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, connectHits, RefinementList } from "react-instantsearch-dom";
import { CustomSearchBox } from "./FeedSearch";
import { CustomRefinementList } from "./RefinementList";
import { Paper } from "@material-ui/core";
import { RefinementPaper } from "../materialUI/styles";

var db = firebase.firestore();

const searchClient = algoliasearch("471N5SCCV8", "3b9d814b0c08445b640fd407b8dbae54");

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [], loading: false, refresh: false };
  }

  // getAllRecipes = async () => {
  //   const snapshot = await db.collection("Recipes").get();
  //   const allRecipes = [];
  //   snapshot.forEach(doc => (allRecipes[doc.id] = doc.data()));
  //   this.setState({ recipes: allRecipes });
  // };

  render() {
    return (
      <>
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
      </>
    );
  }
}

const CustomHits = connectHits(Feed);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [], loading: false, refresh: false };
  }

  componentDidMount() {
    this.setState({ loading: true });
    db.collection("Recipes").onSnapshot(snapshot => {
      let recipes = [];
      snapshot.forEach(doc => recipes.push({ ...doc.data(), uid: doc.id }));
      this.setState(
        {
          recipes,
          loading: false,
          refresh: true
        },
        () => this.setState({ refresh: false })
      );
    });
  }

  render() {
    return (
      <>
        <InstantSearch searchClient={searchClient} indexName="Recipes" refresh={this.state.refresh}>
          <div className="container">
            <div className="row">
              <div className="col-sm-3"></div>
              <div className="col-sm-9 card-container mb-5">
                <h1 className="headline-feed">
                  <span className="underline--magical">Feed</span>
                </h1>
                <CustomSearchBox />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <RefinementPaper>
                  <CustomRefinementList
                    attribute="flags"
                    title="Flags"
                    operator="and"
                    transformItems={items =>
                      items.map(item => ({
                        ...item,
                        label: item.label.charAt(0).toUpperCase() + item.label.slice(1)
                      }))
                    }
                  />
                  <CustomRefinementList
                    attribute="difficulty"
                    title="Difficulty"
                    operator="or"
                    transformItems={items =>
                      items.map(item => ({
                        ...item,
                        label: item.label.charAt(0).toUpperCase() + item.label.slice(1)
                      }))
                    }
                  />
                </RefinementPaper>
              </div>
              <div className="col-sm-9">
                <CustomHits />
              </div>
            </div>
          </div>
        </InstantSearch>
      </>
    );
  }
}

export default Search;
