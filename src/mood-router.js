export class MoodRouter {
  static init() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      MoodRouter.handleRoute(window.location.pathname);
    });
    
    // Handle initial route
    MoodRouter.handleRoute(window.location.pathname);
  }
  
  static handleRoute(path) {
    const mainContainer = document.querySelector('#mood-container');
    const confirmationMatch = path.match(/\/mood\/confirmation\/(.+)/);
    const moodMatch = path.match(/\/mood\/(.+)/);
    
    if (confirmationMatch) {
      const mood = decodeURIComponent(confirmationMatch[1]);
      const confirmationView = document.createElement('polaris-mood-confirmation');
      confirmationView.mood = mood;
      mainContainer.innerHTML = '';
      mainContainer.appendChild(confirmationView);
    } else if (moodMatch) {
      const mood = moodMatch[1];
      const detailView = document.createElement('polaris-mood-detail');
      detailView.mood = mood;
      
      // Restore moodOptions from sessionStorage
      const storedMoodOptions = sessionStorage.getItem('moodOptions');
      if (storedMoodOptions) {
        detailView.moodOptions = JSON.parse(storedMoodOptions);
      }
      
      mainContainer.innerHTML = '';
      mainContainer.appendChild(detailView);
    } else {
      const mainView = document.createElement('polaris-mood');
      mainContainer.innerHTML = '';
      mainContainer.appendChild(mainView);
    }
  }
} 