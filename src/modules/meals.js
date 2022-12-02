import $ from 'jquery';
import { fillDom } from './Dom.js';

const loadmeals = async () => {
  await $.get(
    `${process.env.URL}filter.php?a=Canadian`,
    (data, status) => {
      if (status === 'success') {
        fillDom(data.meals);
      }
    },
  );
};
export default loadmeals;