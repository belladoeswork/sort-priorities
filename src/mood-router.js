export class MoodRouter {
  static init() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
      // Prevent default behavior
      e.preventDefault();
      MoodRouter.handleRoute(window.location.pathname);
    });
    
    // Handle initial route
    MoodRouter.handleRoute(window.location.pathname);
  }
  
  static handleRoute(path) {
    const mainContainer = document.querySelector('#cognitive-container');
    // Updated regex patterns to match new URL structure
    const confirmationMatch = path.match(/\/(.+)\/confirmation\/(.+)/);
    const detailMatch = path.match(/^\/([^/]+)$/);
    const needsComparisonMatch = path.match(/\/(.+)\/needs-comparison/);
    
    if (needsComparisonMatch) {
      const [, mood] = needsComparisonMatch;
      const comparisonView = document.createElement('cognitive-selector-needs-comparison');
      comparisonView.mood = mood;
      comparisonView.backgroundColor = sessionStorage.getItem('selectedMoodColor');
      // We'll need to store selected needs in sessionStorage to restore them
      const selectedNeeds = JSON.parse(sessionStorage.getItem('selectedNeeds') || '[]');
      comparisonView.selectedNeeds = selectedNeeds;
      mainContainer.innerHTML = '';
      mainContainer.appendChild(comparisonView);
    } else if (confirmationMatch) {
      const [, category, mood] = confirmationMatch;
      const confirmationView = document.createElement('cognitive-need-confirmation');
      confirmationView.mood = decodeURIComponent(mood);
      confirmationView.backgroundColor = sessionStorage.getItem('selectedMoodColor');
      mainContainer.innerHTML = '';
      mainContainer.appendChild(confirmationView);
    } else if (detailMatch) {
      const mood = detailMatch[1];
      const detailView = document.createElement('cognitive-selector-detail');
      detailView.mood = mood;
      
      // Restore moodOptions from sessionStorage
      const storedMoodOptions = sessionStorage.getItem('moodOptions');
      if (storedMoodOptions) {
        detailView.moodOptions = JSON.parse(storedMoodOptions);
      }
      
      mainContainer.innerHTML = '';
      mainContainer.appendChild(detailView);
    } else {
      const mainView = document.createElement('cognitive-selector');
      mainContainer.innerHTML = '';
      mainContainer.appendChild(mainView);
    }
  }
} 