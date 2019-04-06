import Vue from 'vue'

import { Form, FormItem, Input, Button, ButtonGroup, Message, Dropdown, DropdownMenu, DropdownItem, Row, Col, Loading, Dialog, MessageBox, Notification, Checkbox, CheckboxGroup, Tabs, TabPane, Table, TableColumn, Tooltip, Tag, Pagination, ColorPicker, Card, RadioGroup, Radio, TimePicker, DatePicker, Select, Option,TimeSelect } from 'element-ui';
import 'element-ui/lib/theme-chalk/display.css';

const elementUiConfig = {
    size: 'medium', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
}
Vue.prototype.$message = Message;
Vue.prototype.$confirm = Message;
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification

Vue.use(Form, elementUiConfig);
Vue.use(FormItem, elementUiConfig);
Vue.use(Input, elementUiConfig);
Vue.use(Button, elementUiConfig);
Vue.use(ButtonGroup, elementUiConfig);
Vue.use(Dropdown, elementUiConfig);
Vue.use(DropdownMenu, elementUiConfig);
Vue.use(DropdownItem, elementUiConfig);
Vue.use(Row, elementUiConfig);
Vue.use(Col, elementUiConfig);
Vue.use(Loading, elementUiConfig);
Vue.use(Dialog, elementUiConfig);
Vue.use(Checkbox, elementUiConfig);
Vue.use(CheckboxGroup, elementUiConfig);
Vue.use(Tabs, elementUiConfig);
Vue.use(TabPane, elementUiConfig);
Vue.use(Table, elementUiConfig);
Vue.use(TableColumn, elementUiConfig);
Vue.use(Tooltip, elementUiConfig);
Vue.use(Tag, elementUiConfig);
Vue.use(Pagination, elementUiConfig);
Vue.use(ColorPicker, elementUiConfig);
Vue.use(Card, elementUiConfig);

Vue.use(RadioGroup, elementUiConfig);
Vue.use(TimePicker, elementUiConfig);
Vue.use(Radio, elementUiConfig);
Vue.use(DatePicker, elementUiConfig);
Vue.use(Select, elementUiConfig);
Vue.use(Option, elementUiConfig);

Vue.use(TimeSelect, elementUiConfig);

import 'element-ui/lib/theme-chalk/index.css'