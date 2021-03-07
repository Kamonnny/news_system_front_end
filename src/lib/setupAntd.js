import {
  Layout,
  Menu,
  Row,
  Col,
  Result,
  Button,
  Card,
  List,
  Spin,
  Pagination,
} from 'ant-design-vue'

export default {
  install: (app) => {
    app.use(Layout).use(Menu).use(Row).use(Col).use(Result).use(Button).use(Card).use(List).use(Spin).use(Pagination)
  }
}
