<template>
  <p class="title">猪猪新闻</p>

  <a-spin :spinning="spinning">
    <a-list
        item-layout="vertical"
        size="large"
        :pagination="false"
        :data-source="listData"
        style="background-color: white; padding: 0 24px"
    >
      <template #renderItem="{ item }">
        <a-list-item key="item.news_id">
          <template #actions>
            <span>
              <message-outlined/>
              {{ item.comments_count }}
            </span>
            <span>
              <alert-outlined/>
              {{ item.views }}
            </span>
          </template>
          <a-list-item-meta :description="item.content">
            <template #title>
              <a :href="item.href">{{ item.title }}</a>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </a-spin>

  <br>
  <a-pagination :total="total" :defaultPageSize="5" @change="onChange"/>
</template>

<script>
import { onMounted, ref } from 'vue'
import { AlertOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { getNews } from "@/api/news";


export default {
  components: {
    AlertOutlined,
    MessageOutlined,
  },

  setup() {
    const spinning = ref(false)
    const listData = ref([])
    const current = ref(1)
    const total = ref(0)

    const fetchNews = async page => {
      spinning.value = true
      const data = await getNews({
        params: {
          page,
          size: 5
        }
      })
      listData.value = data.items
      total.value = data.total
      spinning.value = false
    }

    onMounted(async () => await fetchNews(1))

    const onChange = (page) => {
      fetchNews(page)
    }

    return {
      listData,
      current,
      total,
      spinning,
      onChange
    };
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 40px;
}
</style>