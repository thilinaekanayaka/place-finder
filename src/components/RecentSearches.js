import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MapIcon from '@mui/icons-material/Map';
import './RecentSearches.css';
import Typography from '@mui/material/Typography';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedRecentSearch } from "../redux/searchDataSlice";

export const RecentSearches = () => {
  const recentSearches = useSelector((state) => state.searchData.recentSearches);
  const dispatch = useDispatch();

  const handleClick = (element) => {
    dispatch(setSelectedRecentSearch(element));
  }

  const recentsList = recentSearches.map(element => {
    return <ListItem key={element.itemID} className="search-list-item" onClick={() => handleClick(element)}>
      <ListItemAvatar>
        <Avatar>
          <AddLocationAltIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={element.address} secondary={`${element.coordinate.lat}, ${element.coordinate.lng}`} />
    </ListItem>
  })

  return (
    <div>
      <div className="search-list-header">
        <Typography variant="h5" component="div">
          <MapIcon className="search-list-header-icon" />Place Finder
        </Typography>
      </div>
      {recentsList.length === 0 ?
        <Typography className="search-list-empty" variant="h6" component="div">
          No recent items...
        </Typography> :
        <List sx={{ bgcolor: 'background.paper' }}>
          {recentsList}
        </List>
      }
    </div>
  )
}