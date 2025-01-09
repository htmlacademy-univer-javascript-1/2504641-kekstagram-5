import {getItems} from './data.js';
import {initGallery} from './photos.js';
import {debounce, showAlert} from './util.js';
import {changeFilter, showFilter} from './filter.js';
import {setState, getState} from './state.js';
import {renderSmallItems} from './miniature.js';
import {hideFormUpload, initFormUpload} from './user-form.js';
import {initValidation} from './validation.js';
import {loadData} from './api.js';

const RENDER_DELAY = 500;
setState(getItems());
try {
  renderSmallItems(getState());
  initGallery(getState());
  changeFilter(debounce(() => renderSmallItems(getState()), RENDER_DELAY));
  showFilter();
} catch (err) {
  showAlert(err.message);
}
initFormUpload(initValidation, hideFormUpload);

loadData()
  .then((items) => {
    setState(items);
  })
  .then(() => {
    renderSmallItems(getState());
    initGallery(getState());
    changeFilter(debounce(() => renderSmallItems(getState()), RENDER_DELAY));
    showFilter();
  })
  .catch((err) => {
    showAlert(err.message);
  });

initFormUpload(initValidation, hideFormUpload);
