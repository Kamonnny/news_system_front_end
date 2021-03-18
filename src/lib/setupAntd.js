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
  Skeleton,
  Descriptions,
  Table,
  Comment,
  Form,
  Input,
  Alert,
  Dropdown,
} from 'ant-design-vue'

export default {
  install: (app) => {
    app.use(Layout).use(Menu).use(Row).use(Col)
        .use(Result).use(Button).use(Card).use(List).use(Spin).use(Pagination)
        .use(Skeleton).use(Descriptions).use(Table).use(Comment).use(Form)
        .use(Input).use(Alert).use(Dropdown)
  }
}
