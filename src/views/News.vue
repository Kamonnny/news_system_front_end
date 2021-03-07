<template>


  <div>
    <a-skeleton :loading="loading">
      <div>
        <p class="title">
          {{ title }}
        </p>

        <p style="margin: 18px 0">
          标签：{{tag}}<br>
          作者：{{author}}<br>
          时间：{{date}}
        </p>

        <p style="font-size: 16px">
          {{ content }}
        </p>
      </div>
    </a-skeleton>
  </div>


</template>

<script>
import { watch, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getNew } from "@/api/news";

export default {
  name: "News",
  setup() {
    const route = useRoute()

    const loading = ref(true)
    const title = ref("")
    const content = ref("")
    const tag = ref("")
    const date = ref("")
    const author = ref("")


    const fetchNew = async newsId => {
      loading.value = true
      const data = await getNew(newsId)
      title.value = data.title
      content.value = data.content
      loading.value = false
      tag.value=data.tag.tag
      date.value=data.update_time
    }

    onMounted(() => fetchNew(route.params.newsId))

    // 当参数更改时获取 newsId
    watch(
        () => route.params,
        async newParams => await fetchNew(newParams.newsId)
    )

    return {
      loading, title, content, tag, date, author
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