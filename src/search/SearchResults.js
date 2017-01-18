import React, { Component } from 'react'
import $ from 'jquery';
const newsApiKey = '275258a3655c449ba4907833f5baf08b';
const apiMain = 'https://newsapi.org/v1/articles?source=';	
const apiTail = '&apiKey='
var	sourceArray = [
		'business-insider-uk', 'ars-technica', 'associated-press', 'buzzfeed', 'bbc-news', 'bbc-sport', 'bild', 'bloomberg', 'business-insider', 'the-verge', 'fox-sports', 'google-news', 'the-wall-street-journal',
		'cnbc', 'cnn', 'daily-mail', 'der-tagesspiegel','die-zeit', 'engadget', 'entertainment-weekly', 'espn-cric-info', 'financial-times', 'focus', 'football-italia', 'fortune', 'four-four-two', 'polygon',
		'gruenderszene', 'hacker-news', 'ign', 'handelsblatt', 'independent', 'mashable', 'metro', 'mirror', 'mtv-news', 'mtv-news-uk', 'national-geographic', 'new-scientist', 'newsweek', 'new-york-magazine', 
		'sky-news', 'sky-sports-news', 'spiegel-online', 't3n', 'talksport', 'techcrunch', 'recode', 'reddit-r-all', 'reuters', 'the-washington-post', 'time', 'usa-today', 'wired-de', 'wirtschafts-woche', 'nfl-news', 
		'techradar', 'the-economist', 'the-guardian-au', 'the-guardian-uk', 'the-hindu', 'the-huffington-post', 'the-lad-bible', 'the-new-york-times', 'the-next-web','the-sport-bible', 'the-telegraph', 'the-times-of-india'
	]

class SearchResults extends Component{
	constructor(props) {
		super(props);
		this.state = {
			searchedArticlesArray : []
		}
    this.componentDidMount = this.componentDidMount.bind(this);		
    this.getArticles = this.getArticles.bind(this);		
	}
	getArticles(source){
    	var url = apiMain + source + apiTail + newsApiKey;
    	$.getJSON(url, (newsData) =>{
    		this.setState({
    			searchedArticlesArray: 
    			this.state.searchedArticlesArray.concat(newsData.articles)}
    		)
    	});		
	}
	componentDidMount() {
		sourceArray.map((source, index)=>{
			this.getArticles(source)
			return 'what is the point of this stupid warning'
		})
	}
	render(){
		return(
			<div style={{fontSize:17}}>
				<h4 style={{textAlign:'center'}}>styling or background needed, filter source array</h4>
			 	{this.state.searchedArticlesArray.map((article, index)=>{
			 		var searchInput = this.props.params.newsToSearchFor.toLowerCase()
			 		var indexOfTitle = article.title.toLowerCase().indexOf(searchInput)
			 		if((indexOfTitle > -1)&&(searchInput.length>0)){
				 		var json = JSON.stringify(article.publishedAt)
				 		var jsonToDate = JSON.parse(json)
				 		var publishedTime = new Date(jsonToDate).getTime()
				 		var rightNow = new Date().getTime()
				 		var daysAgo = (rightNow - publishedTime)/1000/60/60/24
				 		var hoursAgo = daysAgo*24; 
				 		var publishText = ""
				 		if(article.author){publishText = "By " + article.author + " "}
				 		if(daysAgo>1){
				 			hoursAgo = (daysAgo - Math.floor(daysAgo))*24; 
				 			publishText += Math.floor(daysAgo) + " days "
				 		};
				 		var minutesAgo = hoursAgo*60
				 		if(hoursAgo > 3){
				 			publishText += Math.floor(hoursAgo) + " hours ago"
				 		}else if(hoursAgo > 1){
				 			minutesAgo = (hoursAgo - Math.floor(hoursAgo))*60;
				 			publishText += Math.floor(hoursAgo) + " hours "
				 			publishText += Math.floor(minutesAgo) + " minutes ago"
				 		}else{publishText += Math.floor(minutesAgo) + " minutes ago"};
				 		if(daysAgo>5){publishText = ""}
			 			var frontText = article.title.slice(0, indexOfTitle)
			 			var highlightText = article.title.slice(indexOfTitle, indexOfTitle + searchInput.length)
			 			var backText = article.title.slice(indexOfTitle + searchInput.length)
						return(
							<div key={index}>
								<a href={article.url}>
									{frontText}
									<span style={{backgroundColor:'yellow'}}>{highlightText}</span>
									{backText}
								</a>
								<span style={{marginLeft:30, fontSize:13, color:'grey'}}>{publishText}</span>
							</div>
						)			 		
			 		}else{
			 			return null	
			 		}
				})}
			</div>
		)
	}
}

export default SearchResults