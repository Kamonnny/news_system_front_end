<template>


  <div>
    <a-skeleton :loading="loading">
      <div>
        <p class="title">
          {{ title }}
        </p>

        <p style="margin: 18px 0">
          标签：{{ tag }}<br>
          时间：{{ date }}
        </p>

        <p style="font-size: 16px">
          {{ content }}
        </p>
      </div>

      <br>
      <a-textarea v-model:value="value" :rows="4"/>
      <a-button
          html-type="submit"
          :loading="submitting"
          type="primary"
          @click="handleSubmit"
          style="margin-top: 20px; margin-bottom: 20px"
      >
        评论
      </a-button>

      <a-list
          v-if="comments.length"
          :data-source="comments"
          :header="`${total} 评论`"
          item-layout="horizontal"
          style="margin-bottom: 15px"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-comment
                :author="item.username"
                :content="item.comment"
                :datetime="calculationDate(item.update_time)"
                avatar="https://static.ek-studio.cn/private/eachin/image/zhutou.png"
            />
          </a-list-item>
        </template>
      </a-list>

      <a-pagination :total="total" :defaultPageSize="5" @change="onChange" hideOnSinglePage/>

    </a-skeleton>
  </div>


</template>

<script>
import { watch, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getNew, getNewsComments } from "@/api/news"
import moment from 'moment'

export default {
  name: "News",
  setup() {
    moment.locale('zh-cn')

    const route = useRoute()

    const loading = ref(true)
    const title = ref("")
    const content = ref("")
    const tag = ref("")
    const date = ref("")

    const comments = ref([])
    const submitting = ref(false)
    const value = ref('')

    const total = ref(0)

    const onChange = () => {
    }

    const handleSubmit = () => {
      if (!value.value) {
        return
      }

      submitting.value = true
      setTimeout(() => {
        submitting.value = false
        comments.value = [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: value.value,
            datetime: moment().fromNow(),
          },
          ...comments.value,
        ];
        value.value = ''
      }, 1000)
    }

    const calculationDate = date => moment(date).fromNow()

    const fetchNew = async newsId => {
      loading.value = true
      await fetchComment(newsId, 1)
      const data = await getNew(newsId)
      title.value = data.title
      content.value = data.content
      loading.value = false
      tag.value = data.tag.tag
      date.value = data.update_time
    }

    const fetchComment = async (newsId, page) => {
      const data = await getNewsComments(newsId, { page, size: 5 })
      total.value = data.total
      comments.value = data.items
    }

    onMounted(() => fetchNew(route.params.newsId))

    // 当参数更改时获取 newsId
    watch(
        () => route.params,
        async newParams => await fetchNew(newParams.newsId)
    )

    return {
      loading, title, content, tag, date, total,
      comments,
      submitting,
      value,
      handleSubmit,
      onChange,
      calculationDate
    }
  },
}
</script>

<style scoped>
.title {
  font-size: 40px;
  font-weight: 200;
  margin: 0;
}
</style>