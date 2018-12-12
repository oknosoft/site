/**
 *
 *
 * @module activity_options
 *
 * Created by Evgeniy Malyarov on 03.12.2018.
 */

import {ActivityOption} from 'metadata-react/DataField/FieldSelectStatic';

export default [
  {value: 10, text: 'Большой позитивный'},
  {value: 5, text: 'Средний позитивный'},
  {value: 1, text: 'Малый позитивный'},
  {value: 0, text: 'Никакой'},
  {value: -1, text: 'Малый негативный'},
  {value: -5, text: 'Средний негативный'},
  {value: -10, text: 'Большой негативный'},
].map((v) => new ActivityOption(v));

export const categories = alasql('select ref from cat_tags_category where `use`=true and area="activity" order by sorting_field')
  .map((v) => $p.cat.tags_category.get(v));

