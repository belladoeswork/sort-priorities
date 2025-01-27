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
    const moodMatch = path.match(/\/mood\/(.+)/);
    
    if (moodMatch) {
      const mood = moodMatch[1];
      const detailView = document.createElement('polaris-mood-detail');
      detailView.mood = mood;
      mainContainer.innerHTML = '';
      mainContainer.appendChild(detailView);
    } else {
      const mainView = document.createElement('polaris-mood');
      mainContainer.innerHTML = '';
      mainContainer.appendChild(mainView);
    }
  }
} 