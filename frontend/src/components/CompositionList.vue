<template>
  <div class="composition-list">
    <div 
      v-for="composition in compositions" 
      :key="composition.id"
      class="composition-item"
    >
      <van-card
        :title="composition.name"
        :desc="composition.description"
        @click="goToDetail(composition.id)"
      >
        <template #thumb>
          <div class="composition-thumb">
            <div class="tier-badge" :class="`tier-${composition.tier.toLowerCase().replace('-', 'minus')}`">
              {{ composition.tier }}
            </div>
          </div>
        </template>
        
        <template #tags>
          <van-tag size="mini" type="primary">{{ composition.level }}</van-tag>
        </template>
        
        <template #bottom>
          <div class="composition-meta">
            <div class="meta-item">
              <span class="meta-label">成型难度</span>
              <van-rate 
                v-model="composition.difficulty" 
                readonly 
                size="10"
                color="#ffd21e"
                void-color="#eee"
              />
            </div>
            <div class="meta-item">
              <span class="meta-label">流行度</span>
              <van-rate 
                v-model="composition.popularity" 
                readonly 
                size="10"
                color="#ffd21e"
                void-color="#eee"
              />
            </div>
            <div class="meta-item" v-if="composition.avgRank > 0">
              <span class="meta-label">平均排名</span>
              <span class="meta-value">#{{ composition.avgRank }}</span>
            </div>
          </div>
          
          <div class="user-stats" v-if="getUserStats(composition.id)">
            <van-divider>我的战绩</van-divider>
            <div class="stats-row">
              <span>对局: {{ getUserStats(composition.id).games }}</span>
              <span>胜率: {{ getUserStats(composition.id).winRate }}%</span>
            </div>
          </div>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'CompositionList',
  props: {
    compositions: {
      type: Array,
      required: true
    }
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    const goToDetail = (id) => {
      router.push(`/composition/${id}`)
    }

    const getUserStats = (compositionId) => {
      return store.state.statistics.compositionStats[compositionId]
    }

    return {
      goToDetail,
      getUserStats
    }
  }
}
</script>

<style scoped>
.composition-list {
  padding: 8px;
}

.composition-item {
  margin-bottom: 8px;
}

.composition-item .van-card {
  border-radius: 8px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.composition-item .van-card:active {
  transform: translateY(1px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.composition-thumb {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 6px;
  position: relative;
}

.tier-badge {
  color: white;
  font-weight: bold;
  font-size: 12px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.tier-s {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
}

.tier-sminus {
  background: linear-gradient(135deg, #ff9ff3 0%, #f368e0 100%);
}

.tier-aplus {
  background: linear-gradient(135deg, #54a0ff 0%, #2e86de 100%);
}

.composition-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 8px 0;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-label {
  font-size: 10px;
  color: #666;
  min-width: 50px;
}

.meta-value {
  font-size: 10px;
  font-weight: bold;
  color: #333;
}

.user-stats {
  margin-top: 8px;
}

.stats-row {
  display: flex;
  justify-content: space-around;
  font-size: 10px;
  color: #666;
}

.van-divider {
  margin: 6px 0;
}
</style> 
