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
          placeholder="选择阵容"
          readonly
          is-link
          @click="showCompositionPicker = true"
          required
        />
        
        <van-field
          v-model="gameForm.hexesText"
          label="海克斯强化"
          placeholder="选择海克斯强化"
          readonly
          is-link
          @click="showHexPicker = true"
          required
        />
        
        <van-field
          v-model="gameForm.rank"
          label="最终排名"
          type="number"
          placeholder="输入排名 (1-8)"
          required
          :rules="[{ pattern: /^[1-8]$/, message: '请输入1-8的排名' }]"
        />
        
        <van-field
          v-model="gameForm.result"
          label="对局结果"
          placeholder="选择结果"
          readonly
          is-link
          @click="showResultPicker = true"
          required
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
      :style="{ height: '60%' }"
    >
      <van-nav-bar
        title="选择阵容"
        left-text="取消"
        right-text="确认"
        @click-left="showCompositionPicker = false"
        @click-right="confirmComposition"
      />
      <div class="picker-content">
        <van-tabs v-model:active="compositionTab">
          <van-tab title="S级" name="S">
            <div class="composition-options">
              <div 
                v-for="comp in getCompositionsByTier('S')"
                :key="comp.id"
                class="composition-option"
                :class="{ active: selectedComposition?.id === comp.id }"
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
                :class="{ active: selectedComposition?.id === comp.id }"
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
                :class="{ active: selectedComposition?.id === comp.id }"
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

    <!-- 海克斯选择器 -->
    <van-popup 
      v-model:show="showHexPicker" 
      position="bottom"
      :style="{ height: '70%' }"
    >
      <van-nav-bar
        title="选择海克斯强化"
        left-text="取消"
        right-text="确认"
        @click-left="showHexPicker = false"
        @click-right="confirmHexes"
      />
      <div class="picker-content">
        <div class="hex-options">
          <van-checkbox-group v-model="selectedHexes">
            <van-cell-group>
              <van-cell
                v-for="hex in hexes"
                :key="hex"
                clickable
                @click="toggleHex(hex)"
              >
                <template #title>
                  <van-checkbox :name="hex" />
                  <span class="hex-name">{{ hex }}</span>
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
      </div>
    </van-popup>

    <!-- 结果选择器 -->
    <van-action-sheet
      v-model:show="showResultPicker"
      :actions="resultOptions"
      @select="onSelectResult"
      cancel-text="取消"
    />
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'

export default {
  name: 'AddGame',
  setup() {
    const router = useRouter()
    const store = useStore()

    const showCompositionPicker = ref(false)
    const showHexPicker = ref(false)
    const showResultPicker = ref(false)
    const compositionTab = ref('S')
    
    const selectedComposition = ref(null)
    const selectedHexes = ref([])

    const gameForm = reactive({
      compositionName: '',
      compositionId: null,
      hexesText: '',
      hexes: [],
      rank: '',
      result: '',
      notes: ''
    })

    const compositions = computed(() => store.state.compositions)
    const hexes = computed(() => store.state.hexes)

    const getCompositionsByTier = (tier) => {
      return store.getters.getCompositionsByTier(tier)
    }

    const resultOptions = [
      { name: '胜利 (前4名)', value: 'win' },
      { name: '失败 (后4名)', value: 'lose' }
    ]

    const selectComposition = (composition) => {
      selectedComposition.value = composition
    }

    const confirmComposition = () => {
      if (selectedComposition.value) {
        gameForm.compositionName = selectedComposition.value.name
        gameForm.compositionId = selectedComposition.value.id
        showCompositionPicker.value = false
      }
    }

    const toggleHex = (hex) => {
      const index = selectedHexes.value.indexOf(hex)
      if (index > -1) {
        selectedHexes.value.splice(index, 1)
      } else {
        if (selectedHexes.value.length < 3) {
          selectedHexes.value.push(hex)
        } else {
          Toast('最多选择3个海克斯强化')
        }
      }
    }

    const confirmHexes = () => {
      if (selectedHexes.value.length === 0) {
        Toast('请至少选择一个海克斯强化')
        return
      }
      gameForm.hexes = [...selectedHexes.value]
      gameForm.hexesText = selectedHexes.value.join(', ')
      showHexPicker.value = false
    }

    const onSelectResult = (action) => {
      gameForm.result = action.name
      gameForm.resultValue = action.value
      showResultPicker.value = false
    }

    const validateForm = () => {
      if (!gameForm.compositionId) {
        Toast('请选择使用的阵容')
        return false
      }
      if (gameForm.hexes.length === 0) {
        Toast('请选择海克斯强化')
        return false
      }
      if (!gameForm.rank || !/^[1-8]$/.test(gameForm.rank)) {
        Toast('请输入正确的排名 (1-8)')
        return false
      }
      if (!gameForm.resultValue) {
        Toast('请选择对局结果')
        return false
      }
      return true
    }

    const saveGame = () => {
      if (!validateForm()) return

      const gameRecord = {
        compositionId: gameForm.compositionId,
        compositionName: gameForm.compositionName,
        hexes: gameForm.hexes,
        rank: parseInt(gameForm.rank),
        result: gameForm.resultValue,
        notes: gameForm.notes
      }

      store.dispatch('addGameRecord', gameRecord)
      Toast.success('对局记录保存成功')
      router.push('/')
    }

    const goBack = () => {
      router.go(-1)
    }

    return {
      showCompositionPicker,
      showHexPicker,
      showResultPicker,
      compositionTab,
      selectedComposition,
      selectedHexes,
      gameForm,
      compositions,
      hexes,
      resultOptions,
      getCompositionsByTier,
      selectComposition,
      confirmComposition,
      toggleHex,
      confirmHexes,
      onSelectResult,
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

.composition-options {
  padding: 16px;
}

.composition-option {
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.composition-option.active {
  border-color: #1989fa;
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

.hex-options {
  padding: 0 16px;
}

.hex-name {
  margin-left: 8px;
}

.van-cell {
  padding: 12px 16px;
}

.van-checkbox {
  margin-right: 0;
}
</style> 
