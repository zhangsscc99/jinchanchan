<template>
  <div class="add-game page-container">
    <van-nav-bar 
      title="添加对局" 
      left-text="取消"
      right-text="保存"
      left-arrow
      @click-left="goBack"
      @click-right="saveGame"
    />

    <van-form @submit="saveGame">
      <van-cell-group inset>
        <van-field
          v-model="gameForm.compositionName"
          label="使用阵容"
          placeholder="选择阵容或自定义输入"
          is-link
          @click="showCompositionPicker = true"
          required
        />
        
        <van-field
          v-model="gameForm.rank"
          label="最终排名"
          type="number"
          placeholder="输入排名 (1-8)"
          required
          :rules="[{ pattern: /^[1-8]$/, message: '请输入1-8的排名' }]"
          @input="updateResult"
        >
          <template #right-icon>
            <van-tag 
              v-if="gameForm.rank && /^[1-8]$/.test(gameForm.rank)"
              :type="parseInt(gameForm.rank) <= 4 ? 'success' : 'danger'"
              size="mini"
            >
              {{ parseInt(gameForm.rank) <= 4 ? '胜利' : '失败' }}
            </van-tag>
          </template>
        </van-field>
        
        <van-field
          v-model="gameForm.hexesText"
          label="海克斯强化"
          type="textarea"
          placeholder="输入获得的海克斯强化，用逗号分隔"
          maxlength="100"
          show-word-limit
          required
        />
        
        <van-field
          v-model="gameForm.artifactText"
          label="神器"
          type="textarea"
          placeholder="输入获得的神器，用逗号分隔（选填）"
          maxlength="100"
          show-word-limit
        />
        
        <van-field
          v-model="gameForm.notes"
          label="备注"
          type="textarea"
          placeholder="记录一些心得或关键信息"
          maxlength="200"
          show-word-limit
        />
      </van-cell-group>
    </van-form>

    <!-- 阵容选择器 -->
    <van-popup 
      v-model:show="showCompositionPicker" 
      position="bottom"
      :style="{ height: '70%' }"
    >
      <van-nav-bar
        title="选择阵容"
        left-text="取消"
        @click-left="showCompositionPicker = false"
      />
      <div class="picker-content">
        <!-- 自定义阵容输入 -->
        <div class="custom-composition">
          <van-field
            v-model="customCompositionName"
            label="自定义阵容"
            placeholder="输入自定义阵容名称"
            clearable
          >
            <template #button>
              <van-button 
                size="small" 
                type="primary"
                @click="selectCustomComposition"
                :disabled="!customCompositionName || !customCompositionName.trim()"
              >
                使用
              </van-button>
            </template>
          </van-field>
        </div>
        
        <van-divider>或选择推荐阵容</van-divider>
        
        <van-tabs v-model:active="compositionTab">
          <van-tab title="S级" name="S">
            <div class="composition-options">
              <div 
                v-for="comp in getCompositionsByTier('S')"
                :key="comp.id"
                class="composition-option"
                @click="selectComposition(comp)"
              >
                <div class="option-name">{{ comp.name }}</div>
                <div class="option-desc">{{ comp.level }}</div>
              </div>
            </div>
          </van-tab>
          <van-tab title="S-级" name="S-">
            <div class="composition-options">
              <div 
                v-for="comp in getCompositionsByTier('S-')"
                :key="comp.id"
                class="composition-option"
                @click="selectComposition(comp)"
              >
                <div class="option-name">{{ comp.name }}</div>
                <div class="option-desc">{{ comp.level }}</div>
              </div>
            </div>
          </van-tab>
          <van-tab title="A+级" name="A+">
            <div class="composition-options">
              <div 
                v-for="comp in getCompositionsByTier('A+')"
                :key="comp.id"
                class="composition-option"
                @click="selectComposition(comp)"
              >
                <div class="option-name">{{ comp.name }}</div>
                <div class="option-desc">{{ comp.level }}</div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { showToast } from 'vant'

export default {
  name: 'AddGame',
  setup() {
    const router = useRouter()
    const store = useStore()

    const showCompositionPicker = ref(false)
    const compositionTab = ref('S')
    const customCompositionName = ref('')

    const gameForm = reactive({
      compositionName: '',
      compositionId: null,
      hexesText: '',
      hexes: [],
      artifactText: '',
      artifacts: [],
      rank: '',
      result: '',
      resultValue: '',
      notes: ''
    })

    const compositions = computed(() => store.state.compositions)

    const getCompositionsByTier = (tier) => {
      return store.getters.getCompositionsByTier(tier)
    }

    const selectComposition = (composition) => {
      gameForm.compositionName = composition.name
      gameForm.compositionId = composition.id
      showCompositionPicker.value = false
    }

    const selectCustomComposition = () => {
      if (customCompositionName.value && customCompositionName.value.trim()) {
        gameForm.compositionName = customCompositionName.value.trim()
        gameForm.compositionId = null // 自定义阵容没有ID
        showCompositionPicker.value = false
        customCompositionName.value = ''
      }
    }

    const updateResult = () => {
      if (gameForm.rank && /^[1-8]$/.test(gameForm.rank)) {
        const rank = parseInt(gameForm.rank)
        if (rank <= 4) {
          gameForm.result = '胜利 (前4名)'
          gameForm.resultValue = 'win'
        } else {
          gameForm.result = '失败 (后4名)'
          gameForm.resultValue = 'lose'
        }
      }
    }

    const validateForm = () => {
      if (!gameForm.compositionName || !gameForm.compositionName.trim()) {
        showToast('请选择或输入使用的阵容')
        return false
      }
      if (!gameForm.rank || !/^[1-8]$/.test(gameForm.rank)) {
        showToast('请输入正确的排名 (1-8)')
        return false
      }
      if (!gameForm.hexesText || !gameForm.hexesText.trim()) {
        showToast('请输入海克斯强化')
        return false
      }
      return true
    }

    const saveGame = () => {
      if (!validateForm()) return

      // 更新结果
      updateResult()
      
      // 处理海克斯文本，转换为数组
      const hexes = (gameForm.hexesText || '').split(/[,，]/).map(hex => hex.trim()).filter(hex => hex)
      
      // 处理神器文本，转换为数组
      const artifacts = (gameForm.artifactText || '')
        ? (gameForm.artifactText || '').split(/[,，]/).map(artifact => artifact.trim()).filter(artifact => artifact)
        : []

      const gameRecord = {
        compositionId: gameForm.compositionId,
        compositionName: gameForm.compositionName || '',
        hexes,
        artifacts,
        rank: parseInt(gameForm.rank),
        result: gameForm.resultValue,
        notes: gameForm.notes || ''
      }

      store.dispatch('addGameRecord', gameRecord)
      showToast({ message: '对局记录保存成功', type: 'success' })
      router.push('/')
    }

    const goBack = () => {
      router.go(-1)
    }

    return {
      showCompositionPicker,
      compositionTab,
      customCompositionName,
      gameForm,
      compositions,
      getCompositionsByTier,
      selectComposition,
      selectCustomComposition,
      updateResult,
      saveGame,
      goBack
    }
  }
}
</script>

<style scoped>
.add-game {
  background-color: #f8f8f8;
}

.van-cell-group {
  margin: 16px;
}

.picker-content {
  height: calc(100% - 46px);
  overflow-y: auto;
}

.custom-composition {
  padding: 16px;
  background: #f7f8fa;
}

.composition-options {
  padding: 16px;
}

.composition-option {
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
}

.composition-option:active {
  background: #f0f9ff;
}

.option-name {
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.option-desc {
  font-size: 12px;
  color: #666;
}
</style> 
