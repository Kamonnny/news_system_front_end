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

      <a-list
          v-if="comments.length"
          :data-source="comments"
          :header="`${comments.length} 评论`"
          item-layout="horizontal"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-comment
                :author="item.author"
                :content="item.content"
                :datetime="item.datetime"
            />
          </a-list-item>
        </template>
      </a-list>
      <a-comment>
        <template #content>
          <a-textarea v-model:value="value" :rows="4"/>

          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit" style="margin-top: 20px">
            评论
          </a-button>
        </template>
      </a-comment>

    </a-skeleton>
  </div>


</template>

<script>
import { watch, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getNew } from "@/api/news"
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

    const fetchNew = async newsId => {
      loading.value = true
      const data = await getNew(newsId)
      title.value = data.title
      content.value = data.content
      loading.value = false
      tag.value = data.tag.tag
      date.value = data.update_time
    }

    onMounted(() => fetchNew(route.params.newsId))

    // 当参数更改时获取 newsId
    watch(
        () => route.params,
        async newParams => await fetchNew(newParams.newsId)
    )

    return {
      loading, title, content, tag, date,

      comments,
      submitting,
      value,
      handleSubmit,
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