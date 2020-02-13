import React, { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import RecipeCard from "./RecipeCard";
import { Helmet } from "react-helmet";
import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-dom";
import { CustomSearchBox } from "./SearchBox";
import { CustomRefinementList } from "./RefinementList";
import { CustomHits } from "./Hits";
import { RefinementPaper } from "../materialUI/styles";

import firebase from "./../firebase/config";
import "firebase/firestore";
var db = firebase.firestore();

const searchClient = algoliasearch("471N5SCCV8", "3b9d814b0c08445b640fd407b8dbae54");

class Feed extends Component {
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
      <Helmet>
          <title>Feed | Octo Waffle</title>
        </Helmet>
        {!this.state.loading ? (
          <InstantSearch
            searchClient={searchClient}
            indexName="Recipes"
            refresh={this.state.refresh}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-xs-12 col-lg-9 mb-5">
                  <h1 className="headline-feed">
                    <span className="underline--magical">Feed</span>
                  </h1>
                  <CustomSearchBox />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <RefinementPaper className="refinementPaper">
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
                <div className="col-xs-12 col-lg-9">
                  <CustomHits />
                </div>
              </div>
            </div>
          </InstantSearch>
        ) : (
          <div>
            <ClipLoader
              css={`
                display: block;
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
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

export default Feed;
