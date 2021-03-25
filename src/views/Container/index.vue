<template>
  <a-config-provider :locale="locale">
    <a-layout style="min-height: 100%; min-width: 1200px; background-color: white">
      <a-layout-header style="height: 58px">
        <a-row :gutter="[16,0]">
          <a-col :span="12">
<!--            <a-menu-->
<!--                theme="dark"-->
<!--                mode="horizontal"-->
<!--                v-model:selectedKeys="selectedKeys"-->
<!--                style="line-height: 58px"-->
<!--                @click="clickMenu"-->
<!--            >-->
<!--              <a-menu-item key="Home">Home</a-menu-item>-->
<!--              <a-menu-item key="2">About</a-menu-item>-->
<!--            </a-menu>-->
            <div style="line-height: 58px; color: white; font-size: large; cursor: pointer;" @click="onHome">
              Kamon 新闻
            </div>
          </a-col>
          <a-col :span="12">
            <div style="text-align: right; line-height: 58px">
              <a-dropdown v-if="isLogin">
                <a style="color: white">
                  {{ username }}&nbsp;<DownOutlined/>
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <a @click="logout">退出</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
              <router-link v-else style="color: white" to="/login">登录</router-link>
            </div>
          </a-col>
        </a-row>
      </a-layout-header>

      <a-layout-content style="padding: 0 50px; margin:0 auto;">
        <div class="main-content">
          <a-row :gutter="32">
            <a-col :span="16">
              <router-view/>
            </a-col>
            <a-col :span="8">
              <div class="tag-container" style="margin-top: 102px;">
                <a-table
                    :columns="columns"
                    :data-source="tags"
                    :pagination="false"
                    size="middle"
                    rowKey="tag_id"
                    bordered
                >
                  <template #tag="{record}">
                    <a style="color: #1f1f1f" @click="$router.push(`/main?tagId=${record.tag_id}`)">{{ record.tag }}</a>
                  </template>
                </a-table>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-layout-content>

      <a-layout-footer style="text-align: center; background-color: white">
        ©2021 Created by Stupid Pig
      </a-layout-footer>
    </a-layout>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { defineComponent, onMounted, ref, computed } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'
import { getTags } from "@/api/tags"
import { checkLogin } from "@/lib/token"
import { getUsers } from "@/api/users"
import { useStore } from 'vuex'


export default defineComponent({
  components: {
    DownOutlined,
  },
  setup() {
    const store = useStore()
    const loadingMore = ref(false);
    const showLoadingMore = ref(true);
    const loadingTags = ref(false)
    const tags = ref([])

    const isLogin = ref(checkLogin())

    let page = 1

    const onLoadMore = async () => {
      loadingMore.value = true
      page++
      const data = await getTags({
        params: {
          size: 10,
          page
        }
      })
      // 从后端拿数据
      tags.value.push(...data.items)
      // 是否显示加载，加载好了不转圈
      showLoadingMore.value = data.has_more
      loadingMore.value = false
    }

    const logout = () => {
      isLogin.value = false
      store.commit("upAccessToken", null)
      localStorage.clear()
    }

    const fetchUser = async () => {
      if (!isLogin.value) return

      const data = await getUsers()
      store.commit("upUser", data)
    }

    // 生命周期
    onMounted(async () => {
      loadingTags.value = true
      await fetchUser()
      const params = {
        size: 10,
        page
      }
      const data = await getTags({ params })
      tags.value = data.items
      showLoadingMore.value = data.has_more
      loadingTags.value = false
    })

    const clickMenu = ({ key }) => {
      if (key === "Home") {
        location.href = "/"
      }
    }


    return {
      tags,
      loadingTags,
      loadingMore,
      showLoadingMore,
      onLoadMore,
      logout,
      isLogin,
      selectedKeys: ref(['Home']),
      locale: zhCN,
      clickMenu,
      username: computed(() => store.state.username),
      columns: [
        {
          title: '标签',
          dataIndex: 'tag',
          key: 'tag_id',
          slots: { customRender: 'tag' }
        }
      ],
      onHome:()=> {
        location.href = '/'
      }
    }
  },
});
</script>

<style lang="less">
.main-content {
  margin-top: 40px;
  width: 1100px;

  .tag-container {
    background: #fff;
  }
}

.tag-loading {
  top: 50px
}
</style>
