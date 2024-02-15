import { toast } from 'react-toastify';

export const notification = (message, error = false) => {
    const options = {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'light',
      height:'50px',
      width: '200px'
    };

    if (error) {
      toast.error(message, options);
    } else {
      toast.success(message, options);
    }
  };

  export const timeAgo = (timeString) => {
    const currentTime = new Date();
    const givenTime = new Date(timeString);
    const timeDifference = Math.floor((currentTime - givenTime) / (1000 * 60)); // Difference in minutes
  
    if (timeDifference < 1) {
      return "just now";
    } else if (timeDifference === 1) {
      return "1 min ago";
    } else if (timeDifference < 60) {
      return `${timeDifference} mins ago`;
    } else if (timeDifference < 120) {
      return "1 hour ago";
    } else if (timeDifference < 1440) {
      return `${Math.floor(timeDifference / 60)} hours ago`;
    } else if (timeDifference < 2880) {
      return "1 day ago";
    } else {
      return `${Math.floor(timeDifference / 1440)} days ago`;
    }
  }

  const getItem = (item) =>{
     localStorage.getItem(item);
  }

  const setItem = (item,value) => {
    localStorage.setItem(item,value);
  }