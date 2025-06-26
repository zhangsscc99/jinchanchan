<template>
  <div class="home page-container">
    <van-nav-bar title="金铲铲助手" />
    
    <div class="season-info">
      <van-card
        desc="S14 七源计划赛季"
        title="推荐阵容"
        thumb="/images/season-logo.png"
      >
        <template #tags>
          <van-tag plain type="primary">版本:14.6b</van-tag>
          <van-tag plain type="success">已筛选</van-tag>
        </template>
      </van-card>
    </div>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-tabs v-model:active="activeTab" sticky>
        <van-tab title="S级" name="S">
          <composition-list :compositions="getCompositionsByTier('S')" />
        </van-tab>
        <van-tab title="S-级" name="S-">
          <composition-list :compositions="getCompositionsByTier('S-')" />
        </van-tab>
        <van-tab title="A+级" name="A+">
          <composition-list :compositions="getCompositionsByTier('A+')" />
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import CompositionList from '../components/CompositionList.vue'

export default {
  name: 'Home',
  components: {
    CompositionList
  },
  setup() {
    const store = useStore()
    const activeTab = ref('S')
    const refreshing = ref(false)

    const getCompositionsByTier = computed(() => {
      return store.getters.getCompositionsByTier
    })

    const onRefresh = () => {
      setTimeout(() => {
        refreshing.value = false
      }, 1000)
    }

    return {
      activeTab,
      refreshing,
      getCompositionsByTier,
      onRefresh
    }
  }
}
</script>

<style scoped>
.home {
  background-color: #f8f8f8;
}

.season-info {
  padding: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.season-info .van-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.van-tabs {
  --van-tabs-line-height: 36px;
}

.van-tab {
  font-weight: 500;
  font-size: 14px;
}
</style> 
